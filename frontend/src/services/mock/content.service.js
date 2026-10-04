import { brandClosing, storeIntro } from "@/mock/data/collections";
import works from "@/mock/data/works";
import * as siteData from "@/mock/data/site";

export async function getSiteConfig() {
  return {
    brand: siteData.brand,
    hero: siteData.hero,
    navigation: siteData.navigation,
    footer: siteData.footer,
    store: { currency: siteData.storeState.currency },
    storeIntro,
    brandClosing,
  };
}

export async function getFeaturedWorks() {
  return works;
}
