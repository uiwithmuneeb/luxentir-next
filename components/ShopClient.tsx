"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const categories = [
  "All",
  "Pants",
  "Shirts",
  "Blazers",
  "Co-ords",
  "Party Wear",
];

export default function ShopClient() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        );

  return (
    <>
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              activeCategory === category
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}