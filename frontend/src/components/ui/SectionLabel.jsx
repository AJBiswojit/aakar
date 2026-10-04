import { cx } from "@/utils/format";

/* ---------------------------------- labels --------------------------------- */

export function SectionLabel({ index, total, children, tone, className, align = "left" }) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex items-center gap-4 sm:gap-6",
        align === "between" && "justify-between",
        className,
      )}
    >
      <span className="u-label flex items-center gap-3">
        <span className={cx("inline-block h-[5px] w-[5px] rounded-full", dark ? "bg-cobalt-light" : "bg-cobalt")} />
        {children}
      </span>
      {index ? (
        <span className={cx("u-label tabular-nums", dark ? "text-white/35" : "text-mute")}>
          {String(index).padStart(2, "0")}
          {total ? ` / ${String(total).padStart(2, "0")}` : null}
        </span>
      ) : null}
    </div>
  );
}

/* CobaltLine lives in its own module; re-exported here so labels, lines and
   reveals can be pulled from a single studio primitives entry point. */
export { CobaltLine } from "./CobaltLine";

/* --------------------------------- reveals -------------------------------- */

/** Fade + rise. The observer lives in MotionProvider; no per-component JS. */
export function Reveal({ as: Comp = "div", delay = 0, className, children, ...rest }) {
  return (
    <Comp data-reveal="out" className={className} style={{ "--reveal-delay": `${delay}ms` }} {...rest}>
      {children}
    </Comp>
  );
}

/** Mask reveal, line by line — used for brand statements. */
export function RevealLines({ as: Comp = "div", lines = [], className, lineClassName, step = 110, delay = 0 }) {
  return (
    <Comp className={className}>
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          data-reveal-line="out"
          className={cx("block", lineClassName)}
          style={{ "--line-delay": `${delay + i * step}ms` }}
        >
          <span>{line}</span>
        </span>
      ))}
    </Comp>
  );
}

/** Left→right clip reveal, for figures. */
export function Mask({ as: Comp = "div", className, children, delay = 0, ...rest }) {
  return (
    <Comp data-mask="out" className={className} style={{ "--reveal-delay": `${delay}ms` }} {...rest}>
      {children}
    </Comp>
  );
}

/* ------------------------------- micro content ----------------------------- */

export function Badge({ children, tone, className }) {
  const dark = tone === "dark";
  return (
    <span
      className={cx(
        "u-label-sm inline-flex items-center rounded-full border px-2.5 py-1 tracking-[0.16em]",
        dark ? "border-white/15 text-white/60" : "border-hair text-ink/60",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default SectionLabel;
