import products from "@/mock/data/products";

const byOrder = (left, right) => left.order - right.order;
const publishedProducts = () => products.filter((product) => product.status === "published");

export async function getProducts() {
  return [...publishedProducts()].sort(byOrder);
}

export async function getFeaturedProducts() {
  return publishedProducts().filter((product) => product.featured).sort(byOrder);
}

export async function getProductBySlug(slug) {
  return publishedProducts().find((product) => product.slug === slug) ?? null;
}

export async function getShowcaseProduct() {
  return publishedProducts().find((product) => product.isShowcase) ?? publishedProducts()[0] ?? null;
}

export async function getProductsByCategory(categorySlug) {
  return publishedProducts().filter((product) => product.category.slug === categorySlug);
}
