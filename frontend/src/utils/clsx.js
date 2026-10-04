/** Tiny class joiner — avoids pulling a dependency in for one function. */
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
