"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as aakarService from "@/services/aakarService";

export const AakarContext = createContext(null);

/**
 * Hydrated on the server from the service layer, then held in context so every
 * section reads the same snapshot. If `initialData` is missing (e.g. a future
 * client-only route) the provider fetches through the same services.
 */
export function AakarProvider({ initialData, children }) {
  const [data, setData] = useState(initialData ?? null);
  const [status, setStatus] = useState(initialData ? "ready" : "loading");
  const [cart, setCart] = useState(() => initialData?.store?.cart ?? []);
  const [wishlist, setWishlist] = useState(() => initialData?.store?.wishlist ?? []);
  const [overlay, setOverlay] = useState({ kind: null, payload: null });
  /** Store filtering lives here so the collection list and the grid stay in sync. */
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    if (initialData) return;
    let alive = true;
    aakarService
      .getHomepagePayload()
      .then((payload) => {
        if (!alive) return;
        setData(payload);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, [initialData]);

  const refresh = useCallback(async () => {
    setStatus("loading");
    const payload = await aakarService.getHomepagePayload();
    setData(payload);
    setStatus("ready");
  }, []);

  const addToCart = useCallback((productId) => {
    setCart((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeFromCart = useCallback((productId) => setCart((prev) => prev.filter((id) => id !== productId)), []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const openOverlay = useCallback((kind, payload = null) => setOverlay({ kind, payload }), []);
  const closeOverlay = useCallback(() => setOverlay({ kind: null, payload: null }), []);

  const value = useMemo(
    () => ({
      data,
      status,
      refresh,
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      toggleWishlist,
      overlay,
      openOverlay,
      closeOverlay,
      categoryFilter,
      setCategoryFilter,
    }),
    [
      data,
      status,
      refresh,
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      toggleWishlist,
      overlay,
      openOverlay,
      closeOverlay,
      categoryFilter,
      setCategoryFilter,
    ],
  );

  return <AakarContext.Provider value={value}>{children}</AakarContext.Provider>;
}

export function useAakar() {
  const ctx = useContext(AakarContext);
  if (!ctx) throw new Error("useAakar must be used inside <AakarProvider>");
  return ctx;
}

/* ---------- selector hooks: the only API sections know about ---------- */

export const useSite = () => useAakar().data;
export const useProducts = () => useAakar().data?.products ?? [];
export const useFeaturedProducts = () => useAakar().data?.featuredProducts ?? [];
export const useFeaturedWorks = () => useAakar().data?.works ?? [];
export const useCategories = () => useAakar().data?.categories ?? [];
export const useCollections = () => useAakar().data?.collections ?? [];
export const useArtist = () => useAakar().data?.artist ?? null;
export const useProcessData = () => useAakar().data?.process ?? { steps: [], meta: {} };
export const useShowcaseProduct = () => useAakar().data?.showcase ?? null;
export const useCart = () => {
  const { cart, data } = useAakar();
  const products = data?.products ?? [];
  const items = cart.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const subtotal = items.reduce((sum, p) => sum + p.pricing.amount, 0);
  return { items, count: items.length, subtotal, currency: data?.store?.currency ?? "INR" };
};
export const useWishlist = () => {
  const { wishlist, data } = useAakar();
  const products = data?.products ?? [];
  const items = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return { items, count: items.length };
};
export const useOverlay = () => {
  const { overlay, openOverlay, closeOverlay } = useAakar();
  return { ...overlay, openOverlay, closeOverlay };
};

export const useCategoryFilter = () => {
  const { categoryFilter, setCategoryFilter } = useAakar();
  return [categoryFilter, setCategoryFilter];
};

/** Detail view is fetched lazily through the service — same shape as an API call. */
export function useProductDetail(slug) {
  const [state, setState] = useState({ slug: null, status: "idle", product: null });

  useEffect(() => {
    if (!slug) return undefined;
    let alive = true;
    aakarService
      .getProductBySlug(slug)
      .then((product) => alive && setState({ slug, status: "ready", product }))
      .catch(() => alive && setState({ slug, status: "error", product: null }));
    return () => {
      alive = false;
    };
  }, [slug]);

  /* derived, so opening a new form never needs a second render pass */
  if (!slug) return { status: "idle", product: null };
  if (state.slug !== slug) return { status: "loading", product: null };
  return { status: state.status, product: state.product };
}
