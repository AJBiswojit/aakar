import { useServiceData } from "./useServiceData";
import {
  getFeaturedProducts as fetchFeaturedProducts,
  getProducts as fetchProducts,
  getShowcaseProduct as fetchShowcaseProduct,
} from "@/services";

const EMPTY_PRODUCTS = [];

export function useProducts() {
  const { data, loading, error } = useServiceData(fetchProducts, EMPTY_PRODUCTS);
  return { products: data, loading, error };
}

export function useFeaturedProducts() {
  const { data, loading, error } = useServiceData(fetchFeaturedProducts, EMPTY_PRODUCTS);
  return { products: data, loading, error };
}

export function useShowcaseProduct() {
  const { data, loading, error } = useServiceData(fetchShowcaseProduct, null);
  return { product: data, loading, error };
}
