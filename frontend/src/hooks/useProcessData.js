import { useServiceData } from "./useServiceData";
import { getProcessData } from "@/services/mock/artist.service";

const EMPTY_PROCESS_DATA = { steps: [], meta: {} };

export function useProcessData() {
  const { data, loading, error } = useServiceData(getProcessData, EMPTY_PROCESS_DATA);
  return { ...data, loading, error };
}
