import { useEffect, useRef, useState } from "react";
import { cx } from "@/utils/format";
import { SectionLabel, Reveal } from "@/components/ui/SectionLabel";
import { useProcessData } from "@/hooks/useProcessData";

/**
 * ROOM 03.5 — the method. Seven states, one object.
 * The plate on the left is driven by which step is under the reader's eye.
 */
export function ProcessSection() {
  const { steps = [], meta = {} } = useProcessData();
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!steps.length) return;
    const nodes = rootRef.current?.querySelectorAll("[data-step]");
    if (!nodes?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-step")));
        });
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [steps.length]);

  const progress = steps.length ? (active + 1) / steps.length : 0;

  return (
    <section
      id="process"
      data-nav-id="about"
      data-nav-theme="dark"
      ref={rootRef}
      className="tone-dark grain section overflow-hidden py-[clamp(5rem,11vh,9rem)]"
    >
      <div className="shell">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel tone="dark" index="03">
              {meta.eyebrow ?? "Method / Seven states"}
            </SectionLabel>
            <h2 className="u-display mt-6 text-[clamp(2rem,5.2vw,4.2rem)] text-white">{meta.title ?? "From Zero → Form"}</h2>
          </div>
          <Reveal as="p" className="u-body max-w-[24rem] text-white/45" delay={120}>
            {meta.note ?? "Every asset leaves the studio with its full history."}
          </Reveal>
        </header>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* --------------------------------- plate --------------------------------- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[16vh]">
              <div className="fig relative aspect-4/5 w-full bg-process-plate">
                {steps.map((step, i) =>
                  step.image ? (
                    <img
                      key={step.id}
                      src={step.image}
                      alt={`${step.name} stage render`}
                      loading={i === active ? "eager" : "lazy"}
                      fetchPriority={i === active ? "high" : "auto"}
                      className={cx(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-out",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ) : null,
                )}

                {/* typographic plate for stages with no render yet */}
                <div
                  className={cx(
                    "absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-[900ms]",
                    steps[active]?.image ? "opacity-0" : "opacity-100",
                  )}
                >
                  <p className="u-label text-cobalt-light">{steps[active]?.stage}</p>
                  <p className="u-display text-[clamp(2.4rem,4.6vw,4rem)] text-white">{steps[active]?.name}</p>
                  <p className="u-body max-w-[22rem] text-white/55">{steps[active]?.line}</p>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10">
                  <div className="h-full bg-cobalt transition-[width] duration-700 ease-out" style={{ width: `${progress * 100}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="u-label-sm text-white/40">
                  STAGE {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </p>
                <p className="u-label-sm text-white/40">{steps[active]?.index} · {steps[active]?.stage}</p>
              </div>
            </div>
          </div>

          {/* --------------------------------- steps --------------------------------- */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {steps.map((step, i) => (
              <li
                key={step.id}
                data-step={i}
                className="group/step relative border-b border-white/10 py-6 first:border-t md:py-8"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "absolute -left-4 top-0 h-full w-px bg-cobalt transition-opacity duration-700 md:-left-5",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
                <div className="flex items-start gap-5 md:gap-8">
                  <span
                    className={cx(
                      "u-label pt-1 tabular-nums transition-colors duration-500",
                      active === i ? "text-cobalt-light" : "text-white/30",
                    )}
                  >
                    {step.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={cx(
                        "u-display text-[clamp(1.45rem,3vw,2.35rem)] transition-colors duration-500",
                        active === i ? "text-white" : "text-white/40",
                      )}
                    >
                      {step.name}
                    </h3>
                    <p className="u-body mt-3 max-w-[30rem] text-white/50">{step.line}</p>

                    {step.image ? (
                      <div className="fig mt-5 aspect-16/9 w-full lg:hidden">
                        <img src={step.image} alt={`${step.name} stage render`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                    ) : null}
                  </div>
                  <span className="u-label-sm hidden shrink-0 text-white/25 md:block">{step.stage}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
