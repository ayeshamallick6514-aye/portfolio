import manifest from "@/content/media.json";

type Entry = { w: number; h: number; widths: number[] };
const media = manifest as Record<string, Record<string, Entry>>;

export const hasShot = (slug: string, name: string) =>
  Boolean(media[slug]?.[name]);
export const shotNames = (slug: string) => Object.keys(media[slug] ?? {});

type Props = {
  slug: string;
  name: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
  /** Vertical drift in percent, tied to the scroll. */
  parallax?: number;
};

/**
 * A real screenshot of a live project, pre-optimised at build time into AVIF
 * and WebP at several widths (see scripts/build-media.mjs). Plain <picture>,
 * so there is no runtime image service to depend on.
 */
export default function Shot({
  slug,
  name,
  alt,
  sizes,
  eager,
  className,
  parallax,
}: Props) {
  const m = media[slug]?.[name];
  if (!m) return null;
  const base = `/media/${slug}/${name}`;
  const set = (ext: string) =>
    m.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const largest = m.widths[m.widths.length - 1];
  return (
    <picture className={className} data-parallax={parallax}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${base}-${largest}.webp`}
        width={m.w}
        height={m.h}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
