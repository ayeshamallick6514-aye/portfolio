import type { CSSProperties } from "react";
import { stackLayers } from "@/content/career";
import { projects } from "@/content/projects";
import ChapterHead from "@/components/ui/ChapterHead";

/**
 * "Full stack", shown literally: each layer is a sheet that sticks under the
 * top bar while the next one slides up over it, leaving its title strip in
 * view. By the end the whole stack is on screen at once. Pure CSS sticky.
 */
export default function Stack() {
  return (
    <section
      id="stack"
      className="chapter stack on-ink"
      aria-labelledby="stack-title"
    >
      <ChapterHead
        id="stack-title"
        no="03"
        jp="第三章"
        label="The stack"
        title={
          <>
            Every <span className="accent">layer</span>
          </>
        }
        intro="Not a wall of logos. Keep scrolling and the layers stack up: what I use at each level of a product, and where I have used it."
      />

      <ol className="layers">
        {stackLayers.map((l, i) => {
          const used = projects
            .filter((p) => (p.layers as string[]).includes(l.id))
            .map((p) => p.title);
          const last = i === stackLayers.length - 1;
          return (
            <li
              key={l.id}
              className={`layer${last ? " layer--top on-accent" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              <p className="layer__strip label">
                <span className="layer__no">{l.no}</span>
                <span className="layer__tab">{l.name}</span>
                <span className="layer__hint">{l.blurb}</span>
              </p>
              <div className="layer__body">
                <div className="layer__head">
                  <h3 className="layer__name display">{l.name}</h3>
                  <p className="layer__blurb serif">
                    <em>{l.blurb}</em>
                  </p>
                </div>
                <div className="layer__detail">
                  <ul
                    className="layer__tech"
                    aria-label={`${l.name} technologies`}
                  >
                    {l.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {used.length ? (
                    <p className="layer__used">
                      <span className="tag tag--line">Used in</span>{" "}
                      {used.join(" · ")}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
