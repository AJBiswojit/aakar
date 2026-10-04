const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

/**
 * Small fetch boundary for future API-backed services.
 * This is intentionally unused until a real backend is configured.
 */
export async function apiRequest(path, options = {}) {
  if (!apiBaseUrl) {
    throw new Error("Set VITE_API_BASE_URL before making API requests.");
  }

  const base = apiBaseUrl.replace(/\/$/, "");
  const endpoint = `${base}/${String(path).replace(/^\//, "")}`;
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}).`);
  }

  if (response.status === 204) return null;
  return response.json();
}
