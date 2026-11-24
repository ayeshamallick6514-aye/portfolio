import manifest from "@/content/art.json";

type Entry = { w: number; h: number; widths: number[] };
const art = manifest as Record<string, Entry>;

export const hasArt = (name: string) => Boolean(art[name]);

type Props = {
  name: string;
  className?: string;
  sizes: string;
  /** Start scale for a slow push-in tied to the scroll. */
  zoom?: number;
  /** Vertical drift in percent, tied to the scroll. */
  parallax?: number;
  eager?: boolean;
};

/**
 * Original ink artwork (see scripts/gen-art.mjs and scripts/build-art.mjs).
 * It is decoration, so it carries an empty alt; everything it sits beside is
 * real text. The image is black on white and is multiplied or screened onto
 * the page by CSS, so it takes on the paper and ink of the current theme.
 */
export default function Art({
  name,
  className,
  sizes,
  zoom,
  parallax,
  eager,
}: Props) {
  const m = art[name];
  if (!m) return null;
  const base = `/art/${name}`;
  const set = (ext: string) =>
    m.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className={`art${className ? ` ${className}` : ""}`}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${base}-${m.widths[m.widths.length - 1]}.webp`}
        width={m.w}
        height={m.h}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        data-zoom={zoom}
        data-parallax={parallax}
      />
    </picture>
  );
}
