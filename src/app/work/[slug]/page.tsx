import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  gallery,
  nextProject,
  projectBySlug,
  projects,
} from "@/content/projects";
import TLink, { ChapterLink } from "@/components/chrome/TLink";
import ScrollFX from "@/components/chrome/ScrollFX";
import Shot, { hasShot } from "@/components/ui/Shot";
import Waveform from "@/components/ui/Waveform";
import { Credits } from "@/components/sections/Contact";
import { Tome } from "@/components/ui/Shelf";
import type { CSSProperties } from "react";

// Every case study is prerendered from generateStaticParams. The page reads
// the slug at the top level so that an unknown slug returns a real 404 status,
// which means navigation waits for the page instead of showing a shell first.
export const instant = false;
// Unknown slugs wait for the complete render instead of streaming a shell,
// so notFound() can still set the 404 status.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.kicker}`,
    description: p.oneLiner,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${p.kicker}`,
      description: p.oneLiner,
      type: "article",
    },
  };
}

export default async function CasePage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const next = nextProject(p.slug);
  const nextIndex = projects.findIndex((x) => x.slug === next.slug);
  const media = gallery[p.slug];
  const shots = (media?.shots ?? []).filter((s) => hasShot(p.slug, s.name));
  const points = p.contribution ?? p.highlights ?? [];
  const mine = Boolean(p.contribution);

  return (
    <>
      <article className="case">
        <header className="case__head on-paper">
          <span
            className="case__ghost display outline-text"
            aria-hidden="true"
            data-parallax="-10"
          >
            {p.index}
          </span>
          <ChapterLink to="work" className="case__back label">
            <span aria-hidden="true">←</span> All work
          </ChapterLink>
          <p className="case__kicker label">
            <span className="jp" lang="ja" aria-hidden="true">
              第二章
            </span>
            <span aria-hidden="true">{"//"}</span> Chapter 02.{p.index} —{" "}
            {p.kicker}
          </p>
          <h1
            className={`case__title display${p.title.length > 12 ? " case__title--long" : ""}`}
          >
            {p.title}
          </h1>
          <p className="case__lede serif">{p.oneLiner}</p>

          <dl className="case__meta">
            <div>
              <dt className="label">Role</dt>
              <dd>{p.team ? `${p.role} · ${p.team}` : p.role}</dd>
            </div>
            <div>
              <dt className="label">Status</dt>
              <dd>{p.status}</dd>
            </div>
            <div>
              <dt className="label">Recognition</dt>
              <dd>
                {p.award ? (
                  <>
                    <span className="tag tag--accent">{p.award.rank}</span>{" "}
                    {p.award.event}
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="label">Links</dt>
              <dd className="case__links">
                {p.links.live ? (
                  <a
                    className="textlink"
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live site ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
                {p.links.repo ? (
                  <a
                    className="textlink"
                    href={p.links.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </dd>
            </div>
          </dl>
        </header>

        <div className="case__cover on-paper" data-screen>
          <figure className="case__frame">
            {hasShot(p.slug, "cover") ? (
              <Shot
                slug={p.slug}
                name="cover"
                alt={media?.coverAlt ?? `${p.title} home screen`}
                sizes="(max-width: 899px) 100vw, 92vw"
                eager
              />
            ) : (
              <Waveform className="case__art" />
            )}
          </figure>
        </div>

        <section
          className="case__sec case__brief on-paper"
          aria-labelledby="case-problem"
        >
          <div>
            <h2 id="case-problem" className="case__label label">
              <span>01</span> The problem
            </h2>
            <p className="case__big serif" data-reveal="up">
              {p.problem}
            </p>
          </div>
          <div>
            <h2 className="case__label label">
              <span>02</span> The answer
            </h2>
            <p className="case__body" data-reveal="up">
              {p.solution}
            </p>
          </div>
        </section>

        <section
          className="case__sec case__cut on-ink"
          aria-labelledby="case-cut"
        >
          <h2 id="case-cut" className="case__h display" data-reveal="lines">
            {mine ? (
              <>
                My <span className="accent">cut</span>
              </>
            ) : (
              <>
                What it <span className="accent">does</span>
              </>
            )}
          </h2>
          <p className="case__sub label" data-reveal="up">
            {mine
              ? `What I built as ${p.role}`
              : `Product highlights · built with ${p.team}`}
          </p>
          <ol className="case__points">
            {points.map((pt, i) => (
              <li key={i} data-reveal="up">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <p>{pt}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="case__sec case__flow on-paper-2"
          aria-labelledby="case-flow"
        >
          <h2 id="case-flow" className="case__h display" data-reveal="lines">
            {p.flowTitle}
          </h2>
          <ol className={`flow${p.flow.length === 6 ? " flow--six" : ""}`}>
            {p.flow.map((f, i) => (
              <li key={f.label} className="flow__step" data-reveal="clip">
                <span className="flow__no label">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flow__label display">{f.label}</h3>
                <p className="flow__detail">{f.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {shots.length ? (
          <section
            className="case__sec case__gallery on-paper"
            aria-label="Screens from the product"
          >
            {shots.map((s) => (
              <figure
                key={s.name}
                className={`case__shot${s.phone ? " case__shot--phone" : ""}`}
                data-reveal="clip"
              >
                <div className="case__frame">
                  <Shot
                    slug={p.slug}
                    name={s.name}
                    alt={s.alt}
                    sizes={s.phone ? "20rem" : "(max-width: 899px) 100vw, 46vw"}
                  />
                </div>
                <figcaption className="label">{s.caption}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <section
          className="case__sec case__result on-accent"
          aria-labelledby="case-result"
        >
          <h2 id="case-result" className="case__label label">
            <span>Result</span>
          </h2>
          <p className="case__outcome display" data-reveal="lines">
            {p.result}
          </p>
          <div className="case__foot">
            <div>
              <p className="label">Built with</p>
              <ul className="case__stack">
                {p.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="case__actions">
              {p.links.live ? (
                <a
                  className="btn"
                  href={p.links.live}
                  target="_blank"
                  rel="noreferrer"
                  data-magnetic
                >
                  Open the live site{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
              {p.links.repo ? (
                <a
                  className="btn btn--ghost"
                  href={p.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-magnetic
                >
                  Read the code{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
          {p.note ? <p className="case__note">{p.note}</p> : null}
        </section>

        <nav className="case__next on-ink" aria-label="Next project">
          <TLink href={`/work/${next.slug}`} className="case__nextlink">
            <span className="label">Next chapter — 02.{next.index}</span>
            <span className="case__nexttitle display">{next.title}</span>
            <span className="case__nextkicker serif">
              <em>{next.kicker}</em> <span aria-hidden="true">→</span>
            </span>
            {/* The next project as a volume, pulled off the shelf. */}
            <span className="nextvol" aria-hidden="true">
              <span className="nextvol__turn" data-pull>
                <span
                  className={`tome tome--${(nextIndex % 4) + 1}`}
                  style={
                    {
                      "--t": 2.5,
                      "--k": 1,
                      "--s": next.title.length > 18 ? 0.78 : 1,
                    } as CSSProperties
                  }
                >
                  <Tome
                    no={next.index}
                    title={next.title}
                    line={next.kicker}
                    foot={next.award?.rank ?? next.status}
                  />
                </span>
              </span>
            </span>
          </TLink>
        </nav>
      </article>
      <Credits />
      <ScrollFX />
    </>
  );
}
