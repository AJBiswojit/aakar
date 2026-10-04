import { useServiceData } from "./useServiceData";
import { getArtist } from "@/services";
import { useMotion } from "@/components/common/MotionProvider";

export function useArtist() {
  return useServiceData(getArtist, null);
}

export function useMotionSafeScrollTo() {
  return useMotion().scrollTo;
}
