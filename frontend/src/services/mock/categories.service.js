import categories from "@/mock/data/categories";
import collections from "@/mock/data/collections";
import { cached } from "../cache";

export function getCategories() {
  return cached("categories", () => categories);
}

export function getCollections() {
  return cached("collections", () => collections);
}
