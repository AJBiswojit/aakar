/**
 * Service layer — the only place that knows *where* data comes from.
 * Today: local mock modules. Tomorrow: `fetch('/api/...')`.
 * Signatures are already async and total; nothing in the UI has to change.
 */

import { products } from "@/mock/data/products";
import { works } from "@/mock/data/works";
import { categories } from "@/mock/data/categories";
import { processSteps, processMeta } from "@/mock/data/process";
import { artist } from "@/mock/data/artist";
import { collections, storeIntro, brandClosing } from "@/mock/data/collections";
import * as site from "@/mock/data/site";

const LATENCY_MS = 0;

/** Swap the body of this helper for a real request when the API lands. */
async function resolve(selector, { label = "payload" } = {}) {
  if (LATENCY_MS) await new Promise((r) => setTimeout(r, LATENCY_MS));
  const data = selector();
  if (!data) throw new Error(`AAKAR service: empty ${label}`);
  return data;
}

/* ---------- store ---------- */

export const getAllProducts = () =>
  resolve(() => [...products].sort((a, b) => a.order - b.order), { label: "products" });

export const getFeaturedProducts = () =>
  resolve(() => products.filter((p) => p.featured).sort((a, b) => a.order - b.order), {
    label: "featured products",
  });

export const getProductBySlug = (slug) => resolve(() => products.find((p) => p.slug === slug), { label: "product" });

export const getShowcaseProduct = () =>
  resolve(() => products.find((p) => p.isShowcase) ?? products[0], { label: "showcase product" });

export const getProductsByCategory = (categorySlug) =>
  resolve(() => products.filter((p) => p.category.slug === categorySlug), { label: "category products" });

/* ---------- exhibition ---------- */

export const getFeaturedWorks = () => resolve(() => works, { label: "works" });

export const getWorkBySlug = (slug) => resolve(() => works.find((w) => w.productSlug === slug), { label: "work" });

/* ---------- taxonomy ---------- */

export const getCategories = () => resolve(() => categories, { label: "categories" });

export const getCollections = () => resolve(() => collections, { label: "collections" });

/* ---------- studio ---------- */

export const getProcessSteps = () => resolve(() => ({ steps: processSteps, meta: processMeta }), { label: "process" });

export const getArtist = () => resolve(() => artist, { label: "artist" });

/* ---------- site ---------- */

export const getSiteConfig = () =>
  resolve(
    () => ({
      brand: site.brand,
      hero: site.hero,
      navigation: site.navigation,
      footer: site.footer,
      store: site.storeState,
      storeIntro,
      brandClosing,
    }),
    { label: "site config" },
  );

/* ---------- composition ---------- */

/** One call for the whole homepage payload — keeps the page cheap to render. */
export async function getHomepagePayload() {
  const [site, productsList, featured, works, categoriesList, process, artistData, collectionsList] =
    await Promise.all([
      getSiteConfig(),
      getAllProducts(),
      getFeaturedProducts(),
      getFeaturedWorks(),
      getCategories(),
      getProcessSteps(),
      getArtist(),
      getCollections(),
    ]);

  const showcase = await getShowcaseProduct();

  return {
    ...site,
    products: productsList,
    featuredProducts: featured,
    works,
    categories: categoriesList,
    process,
    artist: artistData,
    collections: collectionsList,
    showcase,
  };
}
