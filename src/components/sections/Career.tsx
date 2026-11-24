import {
  achievements,
  education,
  experience,
  services,
} from "@/content/career";
import { ChapterLink } from "@/components/chrome/TLink";
import TLink from "@/components/chrome/TLink";
import ChapterHead from "@/components/ui/ChapterHead";
import Art from "@/components/ui/Art";

export function Experience() {
  return (
    <section
      id="experience"
      className="chapter experience on-paper-2"
      aria-labelledby="experience-title"
    >
      <ChapterHead
        id="experience-title"
        no="05"
        jp="第五章"
        label="Experience"
        title={
          <>
            On the <span className="accent">job</span>
          </>
        }
      />

      <ol className="xp">
        {experience.map((e, i) => (
          <li key={e.role} className="xp__item" data-reveal="up">
            <div className="xp__side">
              <p className="xp__period label">
                {e.period}
                {e.current ? (
                  <span className="tag tag--accent">Now</span>
                ) : null}
              </p>
              <span className="xp__no display outline-text" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="xp__main">
              <h3 className="xp__role display">{e.role}</h3>
              <p className="xp__org">
                {e.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="xp__logo"
                    src={e.logo}
                    width={96}
                    height={96}
                    alt={`${e.org} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                {e.org} <span aria-hidden="true">·</span> {e.meta}
              </p>
              {e.shipped ? (
                <ul className="xp__ships">
                  {e.shipped.map((sh, n) => (
                    <li key={sh.label} className="xp__ship">
                      <span className="xp__shipno label">
                        Shipped {String(n + 1).padStart(2, "0")}
                      </span>
                      <span className="xp__shiplabel display">{sh.label}</span>
                      <span className="xp__shipdetail">{sh.detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {e.points.length ? (
                <ul className="xp__points">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              ) : null}
              {e.tags ? (
                <div className="xp__extra">
                  <ul className="xp__tags">
                    {e.tags.map((t) => (
                      <li key={t} className="tag tag--line">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ChapterLink to="contact" className="textlink">
                    Start a project <span aria-hidden="true">→</span>
                  </ChapterLink>
                </div>
              ) : null}
            </div>
          </li>
        ))}
        <li className="xp__item" data-reveal="up">
          <div className="xp__side">
            <p className="xp__period label">{education.period}</p>
            <span className="xp__no display outline-text" aria-hidden="true">
              {String(experience.length + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="xp__main">
            <h3 className="xp__role display">{education.degree}</h3>
            <p className="xp__org">
              {education.school} <span aria-hidden="true">·</span>{" "}
              {education.place}
            </p>
            <div className="xp__extra">
              <ul className="xp__tags">
                <li className="tag tag--line">Class of 2028</li>
              </ul>
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
}

export function Receipts() {
  return (
    <section
      id="receipts"
      className="chapter receipts on-paper"
      aria-labelledby="receipts-title"
    >
      <ChapterHead
        id="receipts-title"
        no="06"
        jp="第六章"
        label="Receipts"
        title={
          <>
            The <span className="accent">receipts</span>
          </>
        }
        intro="Hackathon results, each tied to the product that earned it."
      />

      <ul className="tickets">
        {achievements.map((a, i) => (
          <li key={a.event} className="ticket" data-reveal="fold">
            <p className="ticket__no label">
              Receipt No. {String(i + 1).padStart(2, "0")}
            </p>
            <p className="ticket__rank display">{a.rank}</p>
            <h3 className="ticket__event">{a.event}</h3>
            <p className="ticket__detail label">{a.detail}</p>
            {a.project ? (
              <p className="ticket__built">
                <span className="label">Built</span>{" "}
                {a.slug ? (
                  <TLink href={`/work/${a.slug}`} className="textlink">
                    {a.project}
                  </TLink>
                ) : a.href ? (
                  <a
                    href={a.href}
                    className="textlink"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {a.project}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  a.project
                )}
              </p>
            ) : null}
            {a.note ? <p className="ticket__note">{a.note}</p> : null}
            <span
              className="ticket__stamp display"
              aria-hidden="true"
              data-reveal="stamp"
            >
              Received
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="chapter services on-accent"
      aria-labelledby="services-title"
    >
      <Art
        name="aura"
        className="services__art"
        sizes="(max-width: 899px) 90vw, 52vw"
        parallax={7}
      />
      <ChapterHead
        id="services-title"
        no="07"
        jp="第七章"
        label="Services"
        title={<>For hire</>}
        intro="I take freelance work. These are the four things I do best, each backed by something already shipped."
      />

      <ol className="svc">
        {services.map((s) => (
          <li key={s.no} className="svc__row" data-reveal="up">
            <span className="svc__no label">{s.no}</span>
            <h3 className="svc__title display">{s.title}</h3>
            <div className="svc__body">
              <p>{s.body}</p>
              <p className="svc__proof label">
                <span>Proof</span> {s.proof}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="svc__cta" data-reveal="up">
        <ChapterLink to="contact" className="btn" data-magnetic>
          Start a project{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </ChapterLink>
      </div>
    </section>
  );
}
