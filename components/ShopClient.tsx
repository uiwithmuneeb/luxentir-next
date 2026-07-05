"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

export default function ShopClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const searchParams = useSearchParams();

  const categoryNames = useMemo(() => {
    return ["All", ...categories.map((category) => category.name)];
  }, [categories]);

  useEffect(() => {
    const category = searchParams.get("category");

    if (category && categoryNames.includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams, categoryNames]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory !== "All") {
      filtered = filtered.filter((product) => {
        const categoryName =
          typeof product.category === "string"
            ? product.category
            : product.category?.name;

        return categoryName === activeCategory;
      });
    }

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeCategory, search, sortBy, products]);

  return (
    <>
      <div className="shop-toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shop-search"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="shop-sort"
        >
          <option value="default">Sort Products</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <button
          className="btn ghost"
          onClick={() => {
            setSearch("");
            setActiveCategory("All");
            setSortBy("default");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="category-filter">
        {categoryNames.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="shop-result-meta">
        <span>
          Showing: <strong>{activeCategory}</strong>
        </span>

        <span>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </span>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </>
  );
}