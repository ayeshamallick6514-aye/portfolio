import type { ReactNode } from "react";

type Props = {
  no: string;
  jp: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
};

/** Chapter opener: ghost numeral, small label with the chapter mark, big title. */
export default function ChapterHead({
  no,
  jp,
  label,
  title,
  intro,
  id,
}: Props) {
  return (
    <header className="chead">
      <span
        className="chead__ghost display outline-text"
        aria-hidden="true"
        data-parallax="-14"
      >
        {no}
      </span>
      <p className="chead__label label" data-reveal="up">
        <span className="jp" lang="ja" aria-hidden="true">
          {jp}
        </span>
        <span aria-hidden="true">{"//"}</span> Chapter {no} — {label}
      </p>
      <h2 id={id} className="chead__title display" data-reveal="lines">
        {title}
      </h2>
      {intro ? (
        <p className="chead__intro" data-reveal="up">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
