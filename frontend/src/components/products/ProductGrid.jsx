"use client";

import { cx } from "@/lib/format";
import { ProductCard } from "./ProductCard";

/**
 * Editorial grid — deliberately uneven: the second row drops, so the page
 * never reads like a commodity catalogue.
 */
export function ProductGrid({ products = [], columns = 3, className }) {
  const perRow = columns === 4 ? 4 : columns;
  return (
    <div
      className={cx("grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2", perRow === 3 && "lg:grid-cols-3", perRow === 4 && "lg:grid-cols-4", "lg:gap-x-10", className)}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          total={products.length}
          offset={perRow >= 3 ? i % perRow === 1 : i % 2 === 1}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
