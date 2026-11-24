import { profile, site } from "@/content/profile";
import { ChapterLink } from "@/components/chrome/TLink";
import ChapterHead from "@/components/ui/ChapterHead";
import Art from "@/components/ui/Art";
import CopyEmail from "@/components/ui/CopyEmail";
import Volume from "@/components/ui/Volume";

const socials = [
  {
    label: "GitHub",
    handle: "ayeshamallick6514-aye",
    href: profile.links.github,
  },
  {
    label: "LinkedIn",
    handle: "ayesha-perveen-a83339309",
    href: profile.links.linkedin,
  },
];

export function Contact() {
  const [user, domain] = profile.email.split("@");
  return (
    <section
      id="contact"
      className="chapter contact on-ink"
      aria-labelledby="contact-title"
    >
      <span className="contact__tone tone" aria-hidden="true" />
      <Art
        name="city"
        className="contact__art"
        sizes="(max-width: 899px) 100vw, 70vw"
        zoom={1.12}
      />
      <ChapterHead
        id="contact-title"
        no="08"
        jp="第八章"
        label="Contact"
        title={
          <>
            Next chapter: <span className="accent">your project.</span>
          </>
        }
      />

      <div className="contact__grid">
        <p className="contact__lede serif" data-reveal="up">
          Have something that needs building? Tell me what it is and when you
          need it.
        </p>

        <div className="contact__mail" data-reveal="up">
          <p className="label">Write to</p>
          <a
            className="contact__email display"
            data-reveal="chars"
            data-cursor="Write"
            href={`mailto:${profile.email}`}
          >
            {user}
            <wbr />@{domain}
          </a>
          <div className="contact__actions">
            <a
              className="btn"
              href={`mailto:${profile.email}?subject=Project%20enquiry`}
              data-magnetic
            >
              Start a project{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </div>
      </div>

      <ul className="contact__links">
        {socials.map((s) => (
          <li key={s.label} data-reveal="up">
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer me"
              className="contact__link"
            >
              <span className="label">{s.label}</span>
              <span className="contact__handle display">{s.handle}</span>
              <span className="contact__arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Credits() {
  return (
    <footer className="credits on-ink">
      <div className="credits__top">
        <div className="credits__end">
          <span className="credits__kan jp" lang="ja" aria-hidden="true">
            完
          </span>
          <p className="display">End of volume {site.volume}</p>
        </div>
        <Volume />
      </div>
      <div className="credits__cols">
        <p>
          <span className="label">Author</span>
          {profile.name}
          <br />
          {profile.role}, {profile.location}
        </p>
        <p>
          <span className="label">Set in</span>
          Anton, Archivo, Instrument Serif,
          <br />
          JetBrains Mono, Shippori Mincho
        </p>
        <p>
          <span className="label">Made with</span>
          Next.js, TypeScript, GSAP,
          <br />
          Lenis and hand-written WebGL
        </p>
        <p>
          <span className="label">© {site.year}</span>
          {profile.name}.
          <br />
          <ChapterLink to="opening" className="textlink">
            Read it again ↑
          </ChapterLink>
        </p>
      </div>
    </footer>
  );
}
