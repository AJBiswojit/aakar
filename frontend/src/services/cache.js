/**
 * Minimal request cache for the service layer.
 *
 * Multiple callers (seven components use `useSite`, five use `useProducts`)
 * share ONE in-flight/resolved request per key, so switching the mock services
 * to a real API will not multiply identical requests. Failures are evicted so
 * the next caller retries instead of caching an error forever.
 */
const cache = new Map();

export function cached(key, loader) {
  if (cache.has(key)) return cache.get(key);

  const request = Promise.resolve()
    .then(loader)
    .catch((error) => {
      cache.delete(key);
      throw error;
    });

  cache.set(key, request);
  return request;
}

/** Escape hatch for tests / future mutations (e.g. after a purchase). */
export function clearServiceCache(key) {
  if (key === undefined) cache.clear();
  else cache.delete(key);
}
