import { useCallback } from "react";
import { getProductBySlug } from "@/services";
import { useServiceData } from "./useServiceData";

export function useProduct(slug) {
  const loadProduct = useCallback(() => getProductBySlug(slug), [slug]);
  const { data, loading, error } = useServiceData(loadProduct, null);

  if (!slug) return { product: null, loading: false, error: null };
  return { product: data, loading, error };
}
