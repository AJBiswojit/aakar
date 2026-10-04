import { useServiceData } from "./useServiceData";
import { getSiteConfig } from "@/services";

export function useSite() {
  return useServiceData(getSiteConfig, null);
}
