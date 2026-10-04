import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SearchOverlay } from "@/components/common/SearchOverlay";
import { BagPanel } from "@/components/common/BagPanel";
import { ProductQuickView } from "@/components/common/ProductQuickView";

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
