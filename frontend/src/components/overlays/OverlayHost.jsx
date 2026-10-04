"use client";

import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SearchOverlay } from "@/components/overlays/SearchOverlay";
import { BagPanel } from "@/components/overlays/BagPanel";
import { ProductQuickView } from "@/components/overlays/ProductQuickView";

/** Single mount point for every overlay in the homepage. */
export function OverlayHost() {
  return (
    <>
      <MobileMenu />
      <SearchOverlay />
      <BagPanel />
      <ProductQuickView />
    </>
  );
}

export default OverlayHost;
