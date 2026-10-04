import { brandClosing, storeIntro } from "@/mock/data/collections";
import works from "@/mock/data/works";
import * as siteData from "@/mock/data/site";
import { cached } from "../cache";

export function getSiteConfig() {
  return cached("site", () => ({
    brand: siteData.brand,
    hero: siteData.hero,
    navigation: siteData.navigation,
    footer: siteData.footer,
    store: { currency: siteData.storeState.currency },
    storeIntro,
    brandClosing,
  }));
}

export function getFeaturedWorks() {
  return cached("works", () => works);
}
