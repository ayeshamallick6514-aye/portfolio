// Real photographs, shown as a strip of prints under the story page.
// Only optimised copies live in /public/photos (480 and 900 px wide, 4:5).
const snaps = [
  {
    name: "snap-1",
    alt: "Oriental Techhack Hackathon",
    caption: "Oriental TechHack",
  },
  {
    name: "snap-2",
    alt: "Moments with BTG Venture",
    caption: "Moments with BTG Venture",
  },
  {
    name: "snap-3",
    alt: "Volunteers Broken Code Battle",
    caption: "Volunteers Broken Code Battle",
  },
  {
    name: "snap-4",
    alt: "Ideate Define Showcase Hackathon",
    caption: "Ideate Define Showcase Hackathon",
  },
] as const;

export default function Snaps() {
  return (
    <div className="snaps">
      <h3 className="snaps__title label" data-reveal="up">
        Off the page
      </h3>
      <ul className="snaps__row">
        {snaps.map((s) => (
          <li key={s.name} className="snap" data-reveal="deal">
            <figure>
              <picture className="snap__img">
                <source
                  type="image/avif"
                  srcSet={`/photos/${s.name}-480.avif 480w, /photos/${s.name}-900.avif 900w`}
                  sizes="(max-width: 699px) 46vw, 22vw"
                />
                <source
                  type="image/webp"
                  srcSet={`/photos/${s.name}-480.webp 480w, /photos/${s.name}-900.webp 900w`}
                  sizes="(max-width: 699px) 46vw, 22vw"
                />
                <img
                  src={`/photos/${s.name}-900.webp`}
                  width={960}
                  height={540}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption className="label">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
