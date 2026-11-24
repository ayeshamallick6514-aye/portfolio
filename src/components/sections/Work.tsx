import { archive, projects, type Project } from "@/content/projects";
import TLink from "@/components/chrome/TLink";
import ChapterHead from "@/components/ui/ChapterHead";
import Shot, { hasShot } from "@/components/ui/Shot";
import Waveform from "@/components/ui/Waveform";
import Shelf from "@/components/ui/Shelf";

function Panel({ p, eager }: { p: Project; eager?: boolean }) {
  return (
    <TLink href={`/work/${p.slug}`} className="pcard" data-cursor="Open">
      <div className="pcard__media">
        {hasShot(p.slug, "cover") ? (
          <Shot
            slug={p.slug}
            name="cover"
            alt=""
            sizes="(max-width: 899px) 100vw, 58vw"
            eager={eager}
            className="pcard__img"
            parallax={6}
          />
        ) : p.art === "waveform" ? (
          <Waveform className="pcard__img pcard__img--art" />
        ) : (
          <div className="pcard__img pcard__img--blank" />
        )}
        <span className="pcard__tone tone" aria-hidden="true" />
        <span className="pcard__index display">
          <span className="sr-only">Project </span>
          {p.index}
        </span>
      </div>
      <div className="pcard__body">
        <p className="pcard__meta label">
          <span>{p.role}</span>
          {p.award ? (
            <span className="tag tag--accent">{p.award.rank}</span>
          ) : null}
        </p>
        <h3 className="pcard__title display">{p.title}</h3>
        <p className="pcard__line">{p.oneLiner}</p>
        <p className="pcard__foot label">
          <span>{p.stack.slice(0, 4).join(" · ")}</span>
          <span className="pcard__open">
            Read <span aria-hidden="true">→</span>
          </span>
        </p>
      </div>
    </TLink>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="chapter work on-paper-2"
      aria-labelledby="work-title"
    >
      <ChapterHead
        id="work-title"
        no="02"
        jp="第二章"
        label="Selected work"
        title={
          <>
            Selected <span className="accent">work</span>
          </>
        }
        intro="Six products, each built for a real problem and judged against a real deadline. Open a panel for the full chapter."
      />

      <ol className="panels">
        {projects.map((p, i) => (
          <li key={p.slug} className="panel" data-reveal="clip" data-tilt>
            <Panel p={p} eager={i < 2} />
          </li>
        ))}
      </ol>

      <div className="archive">
        <div className="archive__head">
          <div>
            <h3 className="archive__title label" data-reveal="up">
              Also on the shelf
            </h3>
            <p className="archive__hint serif" data-reveal="up">
              Every project as a volume. <em>Pull one out.</em>
            </p>
          </div>
          <Shelf />
        </div>
        <ul className="rows">
          {archive.map((a, i) => {
            const inner = (
              <>
                <span className="row__no label">A{i + 1}</span>
                <span className="row__title display">{a.title}</span>
                <span className="row__blurb">{a.blurb}</span>
                <span className="row__meta label">
                  {a.note ?? a.tags.slice(0, 2).join(" · ")}
                </span>
                <span className="row__arrow" aria-hidden="true">
                  {a.href ? "↗" : "—"}
                </span>
              </>
            );
            return (
              <li key={a.title} className="row" data-reveal="up">
                {a.href ? (
                  <a
                    className="row__link"
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {inner}
                    <span className="sr-only">
                      {" "}
                      (opens the live site in a new tab)
                    </span>
                  </a>
                ) : (
                  <div className="row__link row__link--static">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
