"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/format";
import { IconClose } from "@/components/ui/Icons";
import { useMotion } from "@/components/system/MotionProvider";

/**
 * Shared overlay chrome: scroll lock, Escape, focus return, cobalt edge.
 * Every panel in the homepage uses this so behaviour never diverges.
 */
export function OverlayShell({ open, onClose, label, children, align = "right", className }) {
  const { stopScroll, startScroll } = useMotion();
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    stopScroll();
    document.body.style.overflow = "hidden";

    const id = requestAnimationFrame(() => panelRef.current?.focus());

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll(
        'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      startScroll();
      document.body.style.overflow = "";
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [open, onClose, startScroll, stopScroll]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex" role="dialog" aria-modal="true" aria-label={label}>
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-obsidian/72 backdrop-blur-[3px]"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cx(
          "relative ml-auto flex h-full w-full outline-none",
          align === "right" ? "max-w-[27rem]" : "max-w-none",
          className,
        )}
        style={{ animation: "aakar-panel 620ms cubic-bezier(.16,1,.3,1) both" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors duration-400 hover:border-cobalt hover:text-cobalt-light"
        >
          <IconClose />
        </button>
        {children}
      </div>
      <style>{`@keyframes aakar-panel{from{opacity:0;transform:translate3d(${align === "right" ? "2.5rem" : "0,2.5rem"},0,0)}to{opacity:1;transform:none}}`}</style>
    </div>,
    document.body,
  );
}

export default OverlayShell;
