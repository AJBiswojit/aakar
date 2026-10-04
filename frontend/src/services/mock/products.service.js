import products from "@/mock/data/products";
import { cached } from "../cache";

const byOrder = (left, right) => left.order - right.order;
const publishedProducts = () => products.filter((product) => product.status === "published");

export function getProducts() {
  return cached("products", () => [...publishedProducts()].sort(byOrder));
}

export function getFeaturedProducts() {
  return cached("products:featured", () => publishedProducts().filter((product) => product.featured).sort(byOrder));
}

export function getProductBySlug(slug) {
  return cached(`products:slug:${slug}`, () => publishedProducts().find((product) => product.slug === slug) ?? null);
}

export function getShowcaseProduct() {
  return cached("products:showcase", () => publishedProducts().find((product) => product.isShowcase) ?? publishedProducts()[0] ?? null);
}

export function getProductsByCategory(categorySlug) {
  return cached(`products:category:${categorySlug}`, () =>
    publishedProducts().filter((product) => product.category.slug === categorySlug),
  );
}
