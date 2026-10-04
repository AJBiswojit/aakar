import { Link } from "react-router-dom";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function RouteNotice({ eyebrow = "AAKAR / Atelier", title, children }) {
  return (
    <main id="main" className="tone-light route-message flex items-center py-32">
      <section className="shell w-full" aria-labelledby="route-title">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 id="route-title" className="u-display mt-8 max-w-4xl text-[clamp(2.5rem,8vw,6rem)]">
          {title}
        </h1>
        <div className="u-body mt-8 max-w-2xl text-mute">{children}</div>
        <Link
          to="/"
          className="u-label mt-10 inline-flex border border-ink/20 px-5 py-4 transition-colors hover:border-cobalt hover:text-cobalt"
        >
          RETURN TO THE ATELIER →
        </Link>
      </section>
    </main>
  );
}
