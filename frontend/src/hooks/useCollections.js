import { useServiceData } from "./useServiceData";
import { getCollections } from "@/services/mock/categories.service";

const EMPTY_COLLECTIONS = [];

export function useCollections() {
  const { data, loading, error } = useServiceData(getCollections, EMPTY_COLLECTIONS);
  return { collections: data, loading, error };
}
