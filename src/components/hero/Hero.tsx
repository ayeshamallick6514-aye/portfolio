import { profile } from "@/content/profile";
import { ChapterLink } from "@/components/chrome/TLink";
import LivingArt from "@/components/ui/LivingArt";
import HeroCanvas from "./HeroCanvas";
import HeroIntro from "./HeroIntro";
import HeroDepth from "./HeroDepth";

export default function Hero() {
  return (
    <section
      id="opening"
      className="hero on-paper"
      aria-labelledby="hero-title"
    >
      <div className="hero__tone tone" aria-hidden="true" />

      <HeroCanvas />

      {/* Original ink art, drawn by a shader so the coat and the ink move. */}
      <div className="hero__art" data-intro="art">
        <LivingArt
          name="hero"
          position={[72, 100]}
          focus={[0.62, 0.55]}
          radius={0.5}
          strength={0.0046}
          parallax={18}
        />
      </div>

      <div className="hero__stage">
        <div className="hero__top" data-intro="fade">
          <p className="hero__mark" aria-hidden="true">
            <span className="jp" lang="ja">
              第一章
            </span>
            <span className="label">Chapter 01</span>
          </p>
          <p className="hero__eyebrow label">
            <span className="hero__eyebrow-rule" aria-hidden="true" />
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="hero__title">
          <svg
            className="hero__slash"
            viewBox="0 0 1300 440"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter
                id="rough-edge"
                x="-5%"
                y="-30%"
                width="110%"
                height="160%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.018 0.09"
                  numOctaves="3"
                  seed="7"
                />
                <feDisplacementMap in="SourceGraphic" scale="46" />
              </filter>
            </defs>
            <g data-intro="slash">
              <path
                filter="url(#rough-edge)"
                d="M-20 300 L1320 60 L1320 150 L-20 400 Z"
              />
            </g>
          </svg>
          <h1 id="hero-title" className="hero__name display">
            <span className="hero__line">
              <span className="hero__word">{profile.first}</span>
            </span>
            <span className="hero__line hero__line--b">
              <span className="hero__word outline-text">{profile.last}</span>
            </span>
          </h1>
          {/* Loader mask: the first name in outline on paper, laid exactly over
              the real one. It drains away while the page loads (see Loader). */}
          <div className="hero__inkmask" aria-hidden="true">
            <span className="hero__name display">
              <span className="hero__line">
                <span className="hero__word outline-text">{profile.first}</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero__foot">
        <div className="hero__pitch">
          <p className="hero__lede serif" data-intro="fade">
            {profile.lede} <em className="accent">{profile.ledeAccent}</em>
          </p>
          <div className="hero__cta" data-intro="fade">
            <ChapterLink to="work" className="btn" data-magnetic>
              View the work{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </ChapterLink>
            <ChapterLink to="contact" className="btn btn--ghost" data-magnetic>
              Start a project
            </ChapterLink>
          </div>
        </div>

        <dl className="hero__meta" data-intro="fade">
          <div>
            <dt>Now</dt>
            <dd>{profile.now}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{profile.coreStack.join(" · ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="hero__live" aria-hidden="true" />
              {profile.status}
            </dd>
          </div>
        </dl>
      </div>

      <HeroIntro />
      <HeroDepth />
    </section>
  );
}
