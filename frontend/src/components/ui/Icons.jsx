import {
  ArrowRight,
  Box,
  Check,
  Expand,
  Heart,
  Menu,
  Orbit,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { cx } from "@/utils/format";

const base = "h-4 w-4";
const iconProps = { "aria-hidden": true, strokeWidth: 1.1 };

export const IconSearch = ({ className }) => <Search {...iconProps} className={cx(base, className)} />;

export const IconHeart = ({ className, filled = false }) => (
  <Heart {...iconProps} fill={filled ? "currentColor" : "none"} className={cx(base, className)} />
);

export const IconBag = ({ className }) => <ShoppingBag {...iconProps} className={cx(base, className)} />;
export const IconClose = ({ className }) => <X {...iconProps} className={cx(base, className)} />;
export const IconMenu = ({ className }) => <Menu {...iconProps} className={cx(base, className)} />;
export const IconCube = ({ className }) => <Box {...iconProps} className={cx(base, className)} />;
export const IconOrbit = ({ className }) => <Orbit {...iconProps} className={cx("h-[18px] w-[18px]", className)} />;
export const IconArrows = ({ className }) => <Expand {...iconProps} className={cx("h-[18px] w-[18px]", className)} />;
export const IconArrowRight = ({ className }) => <ArrowRight {...iconProps} className={cx("h-[9px] w-[18px]", className)} />;
export const IconCheck = ({ className }) => <Check {...iconProps} className={cx(base, className)} />;
