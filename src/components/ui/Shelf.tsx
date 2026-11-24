import type { CSSProperties } from "react";
import { archive, projects } from "@/content/projects";
import TLink from "@/components/chrome/TLink";

// Spine thickness and height for each place on the shelf, so the row reads
// as real books rather than ten identical blocks.
const thick = [2.3, 1.7, 2.6, 1.9, 2.2, 1.6, 2.1, 1.7, 2.4, 1.8];
const tall = [1, 0.9, 0.96, 0.85, 1, 0.89, 0.94, 0.82, 0.97, 0.87];

type Book = {
  key: string;
  no: string;
  title: string;
  line: string;
  foot: string;
  href: string;
  internal: boolean;
};

/** One volume: spine, cover, far side and page edges, as four CSS 3D faces. */
export function Tome({
  no,
  title,
  line,
  foot,
}: Pick<Book, "no" | "title" | "line" | "foot">) {
  return (
    <span className="tome__box">
      <span className="tome__face tome__spine">
        <span className="tome__title">{title}</span>
        <span className="tome__no">{no}</span>
      </span>
      <span className="tome__face tome__cover">
        <span className="tome__coverno">{no}</span>
        <span className="tome__covertitle">{title}</span>
        <span className="tome__line">{line}</span>
        <span className="tome__foot">{foot}</span>
      </span>
      <span className="tome__face tome__side" />
      <span className="tome__face tome__top" />
    </span>
  );
}

/**
 * "Also on the shelf", taken literally: every project as a small volume in
 * CSS 3D, spine out. Hovering a spine pulls that book out and turns its cover
 * to face you; hovering an archive row below pulls out its book too.
 *
 * It repeats links that already exist as panels and rows, so it is hidden
 * from assistive technology and kept out of the tab order.
 */
export default function Shelf() {
  const books: Book[] = [
    ...projects.map((p) => ({
      key: p.slug,
      no: p.index,
      title: p.title,
      line: p.kicker,
      foot: p.award?.rank ?? p.status,
      href: `/work/${p.slug}`,
      internal: true,
    })),
    ...archive.map((a, i) => ({
      key: a.title,
      no: `A${i + 1}`,
      title: a.title,
      line: a.tags.slice(0, 2).join(" · "),
      foot: a.note?.split(" · ")[0] ?? "Side story",
      href: a.href ?? "",
      internal: false,
    })),
  ];

  return (
    <div className="shelf" aria-hidden="true">
      <div className="shelf__row" data-turn="7">
        {books.map((b, i) => {
          const style = {
            "--t": thick[i % thick.length],
            "--k": tall[i % tall.length],
            // long titles are set smaller so the whole name fits the spine
            "--s": b.title.length > 18 ? 0.78 : 1,
          } as CSSProperties;
          const cls = `tome tome--${(i % 4) + 1}${b.internal ? "" : ` tome--a${i - projects.length + 1}`}`;
          const box = (
            <Tome no={b.no} title={b.title} line={b.line} foot={b.foot} />
          );
          return (
            <span key={b.key} className="tome__place" data-reveal="drop">
              {b.internal ? (
                <TLink
                  href={b.href}
                  className={cls}
                  style={style}
                  tabIndex={-1}
                  data-cursor="Open"
                >
                  {box}
                </TLink>
              ) : b.href ? (
                <a
                  href={b.href}
                  className={cls}
                  style={style}
                  tabIndex={-1}
                  target="_blank"
                  rel="noreferrer"
                >
                  {box}
                </a>
              ) : (
                <span className={cls} style={style}>
                  {box}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
