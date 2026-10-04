/** Tiny class joiner — the single home for `cx`/`clsx` in the codebase. */
export function clsx(...args) {
  const out = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string" || typeof arg === "number") out.push(String(arg));
    else if (Array.isArray(arg)) out.push(clsx(...arg));
    else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg)) if (value) out.push(key);
    }
  }
  return out.join(" ");
}



/** ₹ formatting kept in one place — the store may change currency later. */
export function formatMoney(amount, currency = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency === "INR" ? "₹" : ""}${Number(amount).toLocaleString("en-IN")}`;
  }
}

export function formatPolygons(count) {
  if (!count && count !== 0) return "—";
  if (count >= 1000) return `${Math.round(count / 1000)}K POLYGONS`;
  return `${count} POLYGONS`;
}

/** Badges are derived from real spec flags only — never invented. */
export function specBadges(specifications = {}) {
  const badges = [];
  if (specifications.pbr) badges.push("PBR");
  if (specifications.textureResolution) badges.push(specifications.textureResolution);
  if (specifications.rigged) badges.push("RIGGED");
  if (specifications.animated) badges.push("ANIMATED");
  if (specifications.uvMapped) badges.push("UV");
  if (specifications.gameReady) badges.push("GAME READY");
  return badges;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export const cx = (...args) => clsx(...args);
