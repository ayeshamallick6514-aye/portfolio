import type { Metadata } from "next";
import { ChapterLink } from "@/components/chrome/TLink";
import Art from "@/components/ui/Art";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="lost on-paper" aria-labelledby="lost-title">
      <Art
        name="wall"
        className="lost__art"
        sizes="(max-width: 899px) 100vw, 50vw"
      />
      <span className="lost__ghost display outline-text" aria-hidden="true">
        404
      </span>
      <p className="label accent">Missing page</p>
      <h1 id="lost-title" className="display">
        This page was torn out.
      </h1>
      <p>
        The address does not match anything in this volume. The contents page
        has everything that does.
      </p>
      <div>
        <ChapterLink to="opening" className="btn">
          Back to the start{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </ChapterLink>
      </div>
    </section>
  );
}
