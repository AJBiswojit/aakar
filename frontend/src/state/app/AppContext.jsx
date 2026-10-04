import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppStateProvider({ children }) {
  const [overlay, setOverlay] = useState({ kind: null, payload: null });
  const [categoryFilter, setCategoryFilter] = useState(null);

  const openOverlay = useCallback((kind, payload = null) => setOverlay({ kind, payload }), []);
  const closeOverlay = useCallback(() => setOverlay({ kind: null, payload: null }), []);
  const value = useMemo(
    () => ({ overlay, openOverlay, closeOverlay, categoryFilter, setCategoryFilter }),
    [overlay, openOverlay, closeOverlay, categoryFilter],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const state = useContext(AppContext);
  if (!state) throw new Error("App state hooks must be used inside AppStateProvider.");
  return state;
}

export function useOverlay() {
  const { overlay, openOverlay, closeOverlay } = useAppState();
  return { ...overlay, openOverlay, closeOverlay };
}

export function useCategoryFilter() {
  const { categoryFilter, setCategoryFilter } = useAppState();
  return [categoryFilter, setCategoryFilter];
}
