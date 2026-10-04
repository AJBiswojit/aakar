export function cssColor(token) {
  if (typeof document === "undefined") return "white";
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || "white";
}
