"use client";

import { cx } from "@/lib/format";

/**
 * COBALT LINE — the one signature decorative element of AAKAR.
 * One hairline (1px) that draws itself in on scroll, horizontally or
 * vertically. It marks transitions, active states and progress. Nothing else.
 *
 * The reveal itself is CSS-driven ([data-cobalt-rule]) and observed once by
 * MotionProvider, so hundreds of lines cost no JS per frame.
 */
export function CobaltLine({ className, delay = 0, thickness = 1, vertical = false, as: Comp = "span" }) {
  return (
    <Comp
      aria-hidden="true"
      data-cobalt-rule="out"
      {...(vertical ? { "data-axis": "y" } : {})}
      className={cx("block", vertical ? "bg-cobalt" : "cobalt-rule origin-left", className)}
      style={vertical ? { width: thickness } : { height: thickness, transitionDelay: `${delay}ms` }}
    />
  );
}

export default CobaltLine;
