"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/hero/Hero";
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { BrandStatement } from "@/components/brand/BrandStatement";
import { ProcessSection } from "@/components/studio/ProcessTimeline";
import { CollectionSection } from "@/components/collection/CollectionSection";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { Interactive3DShowcase } from "@/components/showcase/Interactive3DShowcase";
import { StudioSection } from "@/components/studio/ArtistIntro";
import { CustomProject } from "@/components/brand/CustomProject";
import { FinalStatement } from "@/components/brand/FinalStatement";
import { OverlayHost } from "@/components/overlays/OverlayHost";
import { Cursor } from "@/components/ui/Cursor";

/**
 * The homepage as a sequence of rooms. Each section is its own module;
 * this file only sets the order and the shared chrome.
 */
export function Home() {
  return (
    <>
      <a
        href="#main"
        className="u-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-cobalt focus:px-4 focus:py-3 focus:text-white"
      >
        SKIP TO THE EXHIBITION
      </a>

      <Navbar />

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

      <Footer />

      <OverlayHost />
      <Cursor />
    </>
  );
}

export default Home;
