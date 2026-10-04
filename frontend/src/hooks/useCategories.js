import { useServiceData } from "./useServiceData";
import { getCategories } from "@/services";

const EMPTY_CATEGORIES = [];

export function useCategories() {
  const { data, loading, error } = useServiceData(getCategories, EMPTY_CATEGORIES);
  return { categories: data, loading, error };
}
