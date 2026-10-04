"use client";

/**
 * Two tiny helpers so sections never import scroll machinery directly.
 * Everything else about the studio comes from the service layer.
 */
export { useArtist, useProcessData, useSite } from "@/hooks/useAakar";

import { useMotion } from "@/components/system/MotionProvider";

export function useMotionSafeScrollTo() {
  const { scrollTo } = useMotion();
  return scrollTo;
}
