import { useEffect, useRef, useState } from "react";

/** Shared loading/error lifecycle for the small service-backed data hooks. */
export function useServiceData(loader, initialData = null) {
  const initialDataRef = useRef(initialData);
  initialDataRef.current = initialData;
  const [state, setState] = useState(() => ({ data: initialData, loading: true, error: null }));

  useEffect(() => {
    let active = true;
    const fallback = initialDataRef.current;
    setState({ data: fallback, loading: true, error: null });

    Promise.resolve()
      .then(loader)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (active) setState({ data: fallback, loading: false, error });
      });

    return () => {
      active = false;
    };
  }, [loader]);

  return state;
}
