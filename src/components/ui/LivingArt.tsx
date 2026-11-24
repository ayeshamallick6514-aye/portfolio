"use client";

import { useEffect, useRef } from "react";
import manifest from "@/content/art.json";
import { motionOn, subscribeTheme, tokenRgb, useMotion } from "@/lib/prefs";

type Entry = { w: number; h: number; widths: number[] };
const art = manifest as Record<string, Entry>;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Draws a black-on-white ink illustration as ink only (white becomes
// transparent, so the page's paper shows through and the ink takes the
// theme's colour), and bends it like cloth in wind. Time is quantised to 12
// steps a second, so the movement reads as hand-drawn animation "on twos".
const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec4 uBox;      // image box in canvas px: x, y(from top), w, h
uniform float uTime;
uniform vec2 uFocus;    // centre of the strongest movement, in image uv
uniform float uRadius;
uniform float uStrength;
uniform vec2 uShift;    // pointer parallax, in image uv
uniform vec3 uInk;

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 uv = (px - uBox.xy) / uBox.zw + uShift;
  float aspect = uBox.z / uBox.w;

  float t = floor(uTime * 12.0) / 12.0;
  float d = distance(vec2(uv.x * aspect, uv.y), vec2(uFocus.x * aspect, uFocus.y));
  float m = 0.22 + 0.78 * smoothstep(uRadius, 0.0, d);
  vec2 wind = vec2(
    sin(uv.y * 34.0 + t * 5.1) + 0.6 * sin(uv.y * 71.0 - t * 7.3),
    cos(uv.x * 27.0 - t * 4.2)
  ) * uStrength * m;
  vec2 p = uv + wind;

  float inside = step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0);
  float lum = texture2D(uTex, p).r;
  float a = smoothstep(0.06, 0.9, 1.0 - lum) * inside;
  gl_FragColor = vec4(uInk * a, a);
}
`;

type Props = {
  name: string;
  className?: string;
  /** Where the image sits in its box, as object-position percentages. */
  position?: [number, number];
  /** Centre of the wind, in image coordinates (0..1 from top-left). */
  focus?: [number, number];
  radius?: number;
  strength?: number;
  /** How far the art leans away from the pointer, in pixels. */
  parallax?: number;
};

/**
 * A still illustration brought to life: cover-fitted into its box, drawn by a
 * small shader that ripples it in the wind and leans it against the pointer.
 * The plain image underneath is the fallback (no WebGL, or motion off), and
 * is what shows until the canvas is ready.
 */
export default function LivingArt({
  name,
  className,
  position = [50, 50],
  focus = [0.5, 0.5],
  radius = 0.45,
  strength = 0.0042,
  parallax = 14,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motion = useMotion();
  const m = art[name];
  const [px, py] = position;
  const [fx, fy] = focus;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = wrap.current;
    if (!canvas || !host || !m || !motionOn()) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      const gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      if (!gl) return;
      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type);
        if (!sh) return null;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
        console.warn("[art] shader failed:", gl.getShaderInfoLog(sh));
        return null;
      };
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      const prog = gl.createProgram();
      if (!vs || !fs || !prog) return;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const u = (n: string) => gl.getUniformLocation(prog, n);
      const uRes = u("uRes");
      const uBox = u("uBox");
      const uTime = u("uTime");
      const uShift = u("uShift");
      const uInk = u("uInk");
      gl.uniform2f(u("uFocus"), fx, fy);
      gl.uniform1f(u("uRadius"), radius);
      gl.uniform1f(u("uStrength"), strength);

      const tex = gl.createTexture();
      let ready = false;
      const img = new Image();
      img.decoding = "async";
      const want = canvas.clientWidth * Math.min(devicePixelRatio || 1, 2);
      const width =
        m.widths.find((w) => w >= want) ?? m.widths[m.widths.length - 1];
      img.onload = () => {
        if (cancelled) return;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img,
        );
        ready = true;
        host.dataset.ready = "true";
      };
      img.src = `/art/${name}-${width}.webp`;

      let dpr = 1;
      const size = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
        // Same framing as CSS object-fit: cover with object-position.
        const scale = Math.max(w / m.w, h / m.h);
        const bw = m.w * scale;
        const bh = m.h * scale;
        gl.uniform4f(
          uBox,
          (w - bw) * (px / 100),
          (h - bh) * (py / 100),
          bw,
          bh,
        );
      };
      const paint = () => {
        const ink = tokenRgb("--ink");
        gl.uniform3f(uInk, ink[0], ink[1], ink[2]);
      };
      size();
      paint();

      const lean = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        lean.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        lean.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      let raf = 0;
      let visible = true;
      let last = 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!ready || !visible || document.hidden) return;
        if (now - last < 33) return;
        last = now;
        lean.x += (lean.tx - lean.x) * 0.06;
        lean.y += (lean.ty - lean.y) * 0.06;
        const box = canvas.clientWidth || 1;
        gl.uniform2f(
          uShift,
          (lean.x * parallax) / box,
          (lean.y * parallax * 0.6) / box,
        );
        gl.uniform1f(uTime, (now - t0) / 1000);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const ro = new ResizeObserver(size);
      ro.observe(canvas);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(canvas);
      const unsubTheme = subscribeTheme(paint);
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);

      dispose = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        unsubTheme();
        window.removeEventListener("pointermove", onMove);
        gl.deleteTexture(tex);
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
        delete host.dataset.ready;
      };
    };

    // Decoration: start once the page is usable.
    let timer = 0;
    const run = () => {
      if (!cancelled) start();
    };
    if (document.documentElement.hasAttribute("data-loading")) {
      window.addEventListener("dk:intro", run, { once: true });
    } else {
      timer = window.setTimeout(run, 500);
    }
    return () => {
      cancelled = true;
      window.removeEventListener("dk:intro", run);
      window.clearTimeout(timer);
      dispose?.();
    };
  }, [motion, m, name, px, py, fx, fy, radius, strength, parallax]);

  if (!m) return null;
  const base = `/art/${name}`;
  const set = (ext: string) =>
    m.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

  return (
    <div
      ref={wrap}
      className={`living${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <picture>
        <source type="image/avif" srcSet={set("avif")} sizes="60vw" />
        <source type="image/webp" srcSet={set("webp")} sizes="60vw" />
        <img
          className="living__img"
          src={`${base}-${m.widths[1] ?? m.widths[0]}.webp`}
          width={m.w}
          height={m.h}
          alt=""
          decoding="async"
          style={{ objectPosition: `${px}% ${py}%` }}
        />
      </picture>
      <canvas ref={canvasRef} className="living__canvas" />
    </div>
  );
}
