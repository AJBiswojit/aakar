import { useServiceData } from "./useServiceData";
import { getFeaturedWorks } from "@/services";

const EMPTY_WORKS = [];

export function useFeaturedWorks() {
  const { data, loading, error } = useServiceData(getFeaturedWorks, EMPTY_WORKS);
  return { works: data, loading, error };
}
