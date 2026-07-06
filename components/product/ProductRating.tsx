"use client";

import { useEffect, useState } from "react";

type Review = {
  rating: number;
};

export default function ProductRating({
  productId,
  compact = false,
}: {
  productId: number;
  compact?: boolean;
}) {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getReviews() {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data: Review[] = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setAverage(0);
        setCount(0);
        return;
      }

      const total = data.reduce((sum, item) => sum + item.rating, 0);
      setAverage(total / data.length);
      setCount(data.length);
    }

    getReviews();
  }, [productId]);

  if (count === 0) {
    return (
      <div className={compact ? "product-rating compact" : "product-rating"}>
        <span className="rating-stars muted">☆☆☆☆☆</span>
        <small>No reviews</small>
      </div>
    );
  }

  return (
    <div className={compact ? "product-rating compact" : "product-rating"}>
      <span className="rating-stars">
        {"★".repeat(Math.round(average))}
        {"☆".repeat(5 - Math.round(average))}
      </span>

      <small>
        {average.toFixed(1)} ({count})
      </small>
    </div>
  );
}