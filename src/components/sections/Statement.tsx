import Art, { hasArt } from "@/components/ui/Art";

/**
 * The cut-in: a letterboxed close-up snaps open from a centre line, the way
 * an anime cuts to a character's eyes before a decisive move, while the motto
 * slides across underneath, tied to the scroll.
 */
export default function Statement() {
  return (
    <section
      className="statement on-ink"
      aria-label="Full stack. No fluff. Real ship."
    >
      {hasArt("eyes") ? (
        <div className="statement__cut" data-reveal="slit">
          <span className="statement__lines" aria-hidden="true" />
          <Art
            name="eyes"
            className="statement__art"
            zoom={1.16}
            sizes="100vw"
          />
        </div>
      ) : null}
      <p
        className="statement__text display"
        aria-hidden="true"
        data-scrub-x="-52"
        data-inkfill
      >
        <span>Full stack</span>
        <i>♠</i>
        <span className="outline-text">No bluff</span>
        <i>♥</i>
        <span>Real ship</span>
        <i>♦</i>
        <span className="outline-text statement__last">
          High stakes &gt; safe plays ♣
        </span>
      </p>
    </section>
  );
}
