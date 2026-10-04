import { cx } from "@/lib/format";

const base = "h-4 w-4";

export const IconSearch = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx(base, className)}>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.1" />
    <path d="M13.6 13.6 18 18" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconHeart = ({ className, filled }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={cx(base, className)}>
    <path
      d="M10 16.5S2.8 12.4 2.8 7.7A3.9 3.9 0 0 1 10 5.4a3.9 3.9 0 0 1 7.2 2.3c0 4.7-7.2 8.8-7.2 8.8Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconBag = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx(base, className)}>
    <path d="M4.5 6.5h11l-.8 10.2H5.3L4.5 6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M7.6 8.4V5.6a2.4 2.4 0 0 1 4.8 0v2.8" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconClose = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx(base, className)}>
    <path d="M4.5 4.5 15.5 15.5M15.5 4.5 4.5 15.5" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconMenu = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx(base, className)}>
    <path d="M2.5 7h15M2.5 13h15" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const IconCube = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx("h-4 w-4", className)}>
    <path
      d="M10 2.2 17 6v8l-7 3.8L3 14V6l7-3.8ZM3 6l7 3.7L17 6M10 9.7v10"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconOrbit = ({ className }) => (
  <svg viewBox="0 0 22 22" fill="none" aria-hidden="true" className={cx("h-[18px] w-[18px]", className)}>
    <circle cx="11" cy="11" r="3.2" stroke="currentColor" strokeWidth="1.05" />
    <ellipse cx="11" cy="11" rx="9.2" ry="4.2" stroke="currentColor" strokeWidth="1.05" transform="rotate(-28 11 11)" />
  </svg>
);

export const IconArrows = ({ className }) => (
  <svg viewBox="0 0 22 22" fill="none" aria-hidden="true" className={cx("h-[18px] w-[18px]", className)}>
    <path
      d="M4 9V4h5M18 13v5h-5M13 4h5v5M9 18H4v-5"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconArrowRight = ({ className }) => (
  <svg viewBox="0 0 20 10" fill="none" aria-hidden="true" className={cx("h-[9px] w-[18px]", className)}>
    <path d="M0 5h18M13.5 1 18 5l-4.5 4" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const IconCheck = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cx(base, className)}>
    <path d="M4 10.5 8 14.5 16 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
