import { useServiceData } from "./useServiceData";
import { getSiteConfig } from "@/services/mock/content.service";

export function useSite() {
  return useServiceData(getSiteConfig, null);
}
