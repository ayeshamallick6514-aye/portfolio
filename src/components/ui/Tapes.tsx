type Props = {
  a: string[];
  b: string[];
  tone?: "ink-paper" | "ink-accent" | "paper-ink";
};

function Track({ items }: { items: string[] }) {
  // Two copies side by side; the track slides by exactly one copy and loops.
  const run = [...items, ...items, ...items];
  return (
    <div className="tape__track">
      {[0, 1].map((k) => (
        <span key={k} className="tape__run">
          {run.map((t, i) => (
            <span key={i} className="tape__item">
              {t}
              <span className="tape__star">♠</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/** Two crossed, tilted marquee tapes that mark a chapter break. Decorative. */
export default function Tapes({ a, b, tone = "ink-paper" }: Props) {
  return (
    <div className={`tapes tapes--${tone}`} aria-hidden="true">
      <div className="tape tape--a display">
        <div className="tape__shift">
          <Track items={a} />
        </div>
      </div>
      <div className="tape tape--b display">
        <div className="tape__shift">
          <Track items={b} />
        </div>
      </div>
    </div>
  );
}
