import { Hero } from "@/components/hero/Hero";
import { FeaturedWork } from "@/components/collection/FeaturedWork";
import { BrandStatement } from "@/components/studio/BrandStatement";
import { ProcessSection } from "@/components/studio/ProcessTimeline";
import { CollectionSection } from "@/components/collection/CollectionSection";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { Interactive3DShowcase } from "@/components/3d/Interactive3DShowcase";
import { StudioSection } from "@/components/studio/ArtistIntro";
import { CustomProject } from "@/components/studio/CustomProject";
import { FinalStatement } from "@/components/studio/FinalStatement";

export function Home() {
  return (
    <main id="main">
      <Hero />
      <FeaturedWork />
      <BrandStatement />
      <ProcessSection />
      <CollectionSection />
      <FeaturedProducts />
      <Interactive3DShowcase />
      <StudioSection />
      <CustomProject />
      <FinalStatement />
    </main>
  );
}

export default Home;
