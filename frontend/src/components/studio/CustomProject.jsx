import { CobaltLine, Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/hooks/useSite";

const SCOPE = [
  { id: "sc_01", label: "A single hero asset" },
  { id: "sc_02", label: "A full character pipeline" },
  { id: "sc_03", label: "Look development & presentation" },
  { id: "sc_04", label: "A complete visual concept" },
];

/**
 * ROOM 07 — the invitation. Not a sales banner: one question, one answer.
 */
export function CustomProject() {
  const { data: site } = useSite();
  const email = site?.footer?.contact?.email ?? "studio@aakar.form";

  return (
    <section
      id="commission"
      data-nav-id="studio"
      data-nav-theme="dark"
      className="tone-dark grain section relative overflow-hidden py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell relative z-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel tone="dark" index="08">
            Commissions
          </SectionLabel>
          <h2 className="u-display mt-8 text-[clamp(2.35rem,7.4vw,6rem)] text-white">
            Have something
            <br />
            in mind?
          </h2>
          <CobaltLine tone="dark" className="mt-10 w-full max-w-[34rem]" />
          <Reveal as="p" className="u-h3 mt-8 max-w-[36rem] normal-case leading-[1.4] text-white/70" delay={120}>
            From a single asset to a complete visual concept — let’s build it.
          </Reveal>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Button as="a" href={`mailto:${email}?subject=AAKAR%20—%20Project%20enquiry`} variant="primary" size="lg" tone="dark" data-cursor="SEND">
              START A PROJECT
            </Button>
            <a href={`mailto:${email}`} className="u-label link-underline text-white/55 hover:text-white">
              {email.toUpperCase()}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="u-label text-white/35">Typical scope</p>
          <ul className="mt-6 border-t border-white/10">
            {SCOPE.map((s, i) => (
              <li key={s.id} className="flex items-center gap-4 border-b border-white/10 py-4">
                <span className="u-label-sm tabular-nums text-cobalt-light">{String(i + 1).padStart(2, "0")}</span>
                <span className="u-body text-white/70">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="u-label-sm mt-8 leading-relaxed text-white/35">
            CURRENTLY ACCEPTING COMMISSIONS · REPLY WITHIN 2 WORKING DAYS
          </p>
        </div>
      </div>
    </section>
  );
}

export default CustomProject;
