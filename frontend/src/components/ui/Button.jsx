import { cx } from "@/utils/format";

const Arrow = ({ className }) => (
  <svg
    viewBox="0 0 20 10"
    aria-hidden="true"
    className={cx("h-[9px] w-[18px] shrink-0 transition-transform duration-500 ease-out", className)}
    fill="none"
  >
    <path d="M0 5h18M13.5 1 18 5l-4.5 4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/**
 * AAKAR button. Two states only: interaction (cobalt) and presence (hairline).
 */
export function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  children,
  arrow = true,
  tone,
  className,
  icon,
  ...rest
}) {
  const Comp = as ?? (href ? "a" : "button");
  const dark = tone === "dark";

  const styles = {
    primary:
      "bg-cobalt text-white border border-cobalt hover:bg-cobalt-dark hover:border-cobalt-dark shadow-[0_10px_30px_-18px_rgba(var(--color-cobalt-rgb),0.9)]",
    outline: cx(
      "border bg-transparent hover:border-cobalt",
      dark ? "border-white/25 text-white hover:text-white" : "border-ink/20 text-ink hover:text-cobalt",
    ),
    ghost: cx(
      "border-transparent px-0 hover:text-cobalt",
      dark ? "text-white/70" : "text-ink/65",
    ),
  };

  const sizes = {
    sm: "text-[0.625rem] gap-2.5 px-4 py-2.5",
    md: "text-[0.6875rem] gap-3 px-6 py-3.5",
    lg: "text-xs gap-3.5 px-7 py-4",
  };

  return (
    <Comp
      href={href}
      className={cx(
        "group/btn inline-flex items-center justify-between font-mono uppercase tracking-[0.18em] transition-all duration-500 ease-out",
        variant === "ghost" ? "px-0" : "rounded-[2px]",
        styles[variant] ?? styles.primary,
        sizes[size] ?? sizes.md,
        className,
      )}
      {...(Comp === "button" ? { type: rest.type ?? "button" } : {})}
      {...rest}
    >
      <span className="relative flex items-center gap-3">
        {icon}
        {children}
      </span>
      {arrow ? (
        <Arrow className="group-hover/btn:translate-x-1 opacity-70 group-hover/btn:opacity-100" />
      ) : null}
    </Comp>
  );
}

export function IconButton({ label, children, className, active, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-[2px] border transition-colors duration-400",
        active ? "border-cobalt text-cobalt" : "border-transparent hover:border-ink/20",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
