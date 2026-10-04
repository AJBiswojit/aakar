import { CollectionSection } from "@/components/collection/CollectionSection";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";

export function CollectionPage() {
  return (
    <main id="main">
      <CollectionSection />
      <FeaturedProducts />
    </main>
  );
}

export default CollectionPage;
