import { story } from "@/content/career";
import ChapterHead from "@/components/ui/ChapterHead";
import Art from "@/components/ui/Art";
import Snaps from "@/components/ui/Snaps";

/** Chapter 04: the author's story told as one manga page of five panels. */
export default function Story() {
  const [bhopal, build, deadlines, now] = story;
  return (
    <section
      id="story"
      className="chapter story on-paper"
      aria-labelledby="story-title"
    >
      <ChapterHead
        id="story-title"
        no="04"
        jp="第四章"
        label="Story"
        title={
          <>
            The <span className="accent">author</span>
          </>
        }
      />

      <div className="spage">
        <article className="spanel spanel--place" data-reveal="clip">
          <Art
            name="cliff"
            className="spanel__bg"
            sizes="(max-width: 899px) 100vw, 42vw"
            zoom={1.14}
          />
          <p className="spanel__no label">1</p>
          <div className="spanel__cap">
            <h3 className="display">{bhopal.head}</h3>
            <p>{bhopal.body}</p>
          </div>
        </article>

        <article className="spanel spanel--quote" data-reveal="clip">
          <span className="spanel__tone tone" aria-hidden="true" />
          <p className="spanel__no label">2</p>
          <blockquote className="serif">
            <p>
              “Learn by building <em className="accent">real things</em>, not
              isolated tutorials.”
            </p>
          </blockquote>
          <p className="spanel__side">{build.body}</p>
        </article>

        <article className="spanel spanel--deadline" data-reveal="clip">
          <Art
            name="dash"
            className="spanel__bg"
            sizes="(max-width: 899px) 100vw, 34vw"
            zoom={1.18}
          />
          <p className="spanel__no label">3</p>
          <div className="spanel__cap">
            <h3 className="display">{deadlines.head}</h3>
            <p>{deadlines.body}</p>
          </div>
        </article>

        <article className="spanel spanel--now" data-reveal="clip">
          <Art
            name="desk"
            className="spanel__bg spanel__bg--plain"
            sizes="(max-width: 899px) 100vw, 26vw"
            zoom={1.14}
          />
          <p className="spanel__no label">4</p>
          <div className="spanel__cap">
            <h3 className="display">
              {now.head} <span className="spanel__live" aria-hidden="true" />
            </h3>
            <p>{now.body}</p>
          </div>
        </article>

        <article className="spanel spanel--motto on-ink" data-reveal="clip">
          <Art
            name="field"
            className="spanel__bg spanel__bg--plain"
            sizes="(max-width: 899px) 100vw, 42vw"
            zoom={1.16}
          />
          <p className="spanel__no label">5</p>
          <p className="spanel__motto display">
            Shipping{" "}
            <span className="accent" aria-hidden="true">
              &gt;
            </span>
            <span className="sr-only"> over </span> scrolling
          </p>
        </article>
      </div>

      <Snaps />
    </section>
  );
}
