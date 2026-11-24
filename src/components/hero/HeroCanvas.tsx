"use client";

import { useEffect, useRef } from "react";
import { motionOn, subscribeTheme, tokenRgb, useMotion } from "@/lib/prefs";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Drifting ink clouds drawn as a manga screentone: a rotated dot grid whose
// dot size follows a domain-warped noise field. The pointer swells the dots
// near it, and thin wind streaks cross the upper half.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseStr;
uniform vec3 uInk;
uniform float uCell;
uniform float uNarrow;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++) {
    s += a * noise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float asp = uRes.x / uRes.y;

  // Rotated halftone grid.
  float ang = 0.44;
  float c = cos(ang), s = sin(ang);
  vec2 g = vec2(c * frag.x - s * frag.y, s * frag.x + c * frag.y) / uCell;
  vec2 cell = floor(g) + 0.5;
  vec2 cpx = vec2(c * cell.x + s * cell.y, -s * cell.x + c * cell.y) * uCell;
  vec2 cuv = cpx / uRes;
  vec2 p = vec2(cuv.x * asp, cuv.y);

  // Ink in water: warp the field with itself, drift slowly to the left.
  vec2 q = p * 1.45 + vec2(uTime * 0.028, uTime * 0.006);
  float warp = fbm(q * 1.6 - vec2(uTime * 0.02, 0.0));
  float w = fbm(q + warp * 1.35);
  float d = smoothstep(0.40, 0.80, w);

  // Keep the cloud to the upper right on wide screens, top band on phones,
  // so body text always sits on clean paper.
  float top = 1.0 - smoothstep(0.84, 0.93, cuv.y);
  float mWide = smoothstep(0.30, 0.98, cuv.x) * smoothstep(0.28, 0.80, cuv.y) * top;
  float mNarrow = smoothstep(0.58, 0.80, cuv.y) * (0.6 + 0.4 * cuv.x) * top;
  d *= mix(mWide, mNarrow, uNarrow);

  // Pointer: ink blooms where the cursor is.
  float md = length((cpx - uMouse) / uRes.y);
  d += uMouseStr * exp(-md * md * 46.0);
  d = clamp(d, 0.0, 1.0);

  float r = sqrt(d) * 0.66;
  float dist = length(g - cell);
  float aa = 1.3 / uCell;
  float a = (1.0 - smoothstep(r - aa, r + aa, dist)) * step(0.015, d);

  // Wind streaks.
  vec2 uv = frag / uRes;
  float rows = uRes.y / 5.0;
  float row = floor(uv.y * rows);
  float pick = step(0.955, hash(vec2(row, 7.0)));
  float seg = noise(vec2(uv.x * asp * 2.2 + uTime * (0.5 + hash(vec2(row, 3.0))) , row * 3.17));
  float line = pick * smoothstep(0.62, 0.70, seg) * (1.0 - smoothstep(0.0, 0.28, abs(fract(uv.y * rows) - 0.5)));
  line *= smoothstep(0.42, 0.72, uv.y) * smoothstep(0.1, 0.5, uv.x) * (1.0 - smoothstep(0.86, 0.92, uv.y));
  a = max(a * 0.9, line * 0.55);

  gl_FragColor = vec4(uInk * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[hero] shader compile failed:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Sets the canvas up and returns a function that tears it down. */
function init(canvas: HTMLCanvasElement): (() => void) | undefined {
  const animate = motionOn();
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return; // CSS screentone underneath remains as the fallback.

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
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
  const uTime = u("uTime");
  const uMouse = u("uMouse");
  const uMouseStr = u("uMouseStr");
  const uInk = u("uInk");
  const uCell = u("uCell");
  const uNarrow = u("uNarrow");

  let dpr = 1;
  let narrow = false;
  const size = () => {
    narrow = window.innerWidth < 768;
    dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 1.75);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uCell, (narrow ? 7 : 9) * dpr);
    gl.uniform1f(uNarrow, narrow ? 1 : 0);
  };
  const paint = () => {
    const ink = tokenRgb("--ink");
    gl.uniform3f(uInk, ink[0], ink[1], ink[2]);
  };
  size();
  paint();

  // Pointer, eased so the bloom trails the cursor.
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, str: 0, tstr: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) * dpr;
    mouse.ty = (r.height - (e.clientY - r.top)) * dpr;
    if (mouse.x < -9000) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
    }
    mouse.tstr = e.clientY < r.bottom ? 0.85 : 0;
  };
  const onLeave = () => {
    mouse.tstr = 0;
  };

  let raf = 0;
  let visible = true;
  let last = 0;
  const start = performance.now();
  const draw = (now: number) => {
    mouse.x += (mouse.tx - mouse.x) * 0.09;
    mouse.y += (mouse.ty - mouse.y) * 0.09;
    mouse.str += (mouse.tstr - mouse.str) * 0.06;
    gl.uniform1f(uTime, (now - start) / 1000 + 40);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uMouseStr, mouse.str);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    if (now - last < (narrow ? 41 : 30)) return; // 24 to 33 fps is plenty for slow ink
    last = now;
    draw(now);
  };

  const ro = new ResizeObserver(() => {
    size();
    if (!animate) draw(performance.now());
  });
  ro.observe(canvas);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(canvas);
  const unsubTheme = subscribeTheme(() => {
    paint();
    if (!animate) draw(performance.now());
  });

  if (animate) {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
  } else {
    draw(start); // one still frame
  }
  canvas.dataset.ready = "true";

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    unsubTheme();
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
    delete canvas.dataset.ready;
  };
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const motion = useMotion();

  // WebGL is decoration, so it starts after the page is usable: once the
  // loader hands over, or a moment after first paint on later visits.
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let timer = 0;
    const run = () => {
      dispose = init(canvas);
    };
    if (document.documentElement.hasAttribute("data-loading")) {
      window.addEventListener("dk:intro", run, { once: true });
    } else {
      timer = window.setTimeout(run, 400);
    }
    return () => {
      window.removeEventListener("dk:intro", run);
      window.clearTimeout(timer);
      dispose?.();
    };
  }, [motion]);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
