// Cover art for Aawaz, which has no live demo to screenshot: two voices as
// bar waveforms. The second one is slightly too regular, the tell of a clone.

const bar = (i: number, seed: number) => {
  const a = Math.sin(i * 0.47 + seed) * 0.5 + 0.5;
  const b = Math.sin(i * 0.13 + seed * 2.1) * 0.5 + 0.5;
  const c = Math.sin(i * 1.7 + seed * 0.7) * 0.5 + 0.5;
  return 0.12 + 0.88 * (a * 0.5 + b * 0.3 + c * 0.2) * (0.35 + 0.65 * b);
};
const synth = (i: number) =>
  0.2 +
  0.72 *
    Math.abs(Math.sin(i * 0.262)) *
    (0.55 + 0.45 * Math.abs(Math.sin(i * 0.052)));

export default function Waveform({ className }: { className?: string }) {
  const N = 72;
  const W = 800;
  const step = W / N;
  return (
    <svg
      className={className}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Two voice waveforms, one labelled real and one labelled synthetic"
    >
      <rect width="800" height="500" fill="var(--paper)" />
      <g fill="var(--ink)">
        {Array.from({ length: N }, (_, i) => {
          const h = bar(i, 1.3) * 150;
          return (
            <rect
              key={i}
              x={i * step + 2}
              y={150 - h / 2}
              width={step - 5}
              height={h}
            />
          );
        })}
      </g>
      <g fill="var(--accent)">
        {Array.from({ length: N }, (_, i) => {
          const h = synth(i) * 150;
          return (
            <rect
              key={i}
              x={i * step + 2}
              y={350 - h / 2}
              width={step - 5}
              height={h}
            />
          );
        })}
      </g>
      <g
        fontFamily="var(--font-mono)"
        fontSize="15"
        fontWeight="600"
        letterSpacing="2.2"
      >
        <rect x="24" y="24" width="92" height="28" fill="var(--ink)" />
        <text x="38" y="43" fill="var(--paper)">
          REAL
        </text>
        <rect x="24" y="448" width="152" height="28" fill="var(--accent)" />
        <text x="38" y="467" fill="var(--on-accent)">
          SYNTHETIC
        </text>
      </g>
      <line
        x1="0"
        y1="250"
        x2="800"
        y2="250"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeDasharray="2 10"
      />
    </svg>
  );
}
