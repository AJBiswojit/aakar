import categories from "@/mock/data/categories";
import collections from "@/mock/data/collections";

export async function getCategories() {
  return categories;
}

export async function getCollections() {
  return collections;
}
