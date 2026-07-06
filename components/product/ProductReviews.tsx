"use client";

import { useEffect, useMemo, useState } from "react";

type Review = {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((item) => item.rating === star).length,
      percent: reviews.length
        ? (reviews.filter((item) => item.rating === star).length /
            reviews.length) *
          100
        : 0,
    }));
  }, [reviews]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    }

    fetchReviews();
  }, [productId]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, customerName, rating, comment }),
    });

    const data = await res.json();

    if (data.success) {
      setCustomerName("");
      setRating(5);
      setComment("");
      setMessage("Your review will be visible after admin approval.");
    } else {
      setMessage(data.error || "Something went wrong.");
    }

    setLoading(false);
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="lux-review-section">
      <div className="lux-review-left">
        <div className="lux-review-summary">
          <div>
            <span className="eyebrow">Customer Reviews</span>
            <h2>Ratings & Reviews</h2>
          </div>

          <div className="lux-score-box">
            <strong>{averageRating ? averageRating.toFixed(1) : "0.0"}</strong>
            <span>
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </span>
            <small>
              ({reviews.length} review{reviews.length === 1 ? "" : "s"})
            </small>
          </div>

          <div className="lux-rating-bars">
            {ratingBreakdown.map((row) => (
              <div className="lux-rating-row" key={row.star}>
                <span>{row.star} ★</span>
                <div>
                  <em style={{ width: `${row.percent}%` }} />
                </div>
                <small>{row.count}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="lux-review-list">
          {reviews.length === 0 ? (
            <p className="empty-review">
              No approved reviews yet. Be the first to review this product.
            </p>
          ) : (
            reviews.map((item) => (
              <article className="lux-review-card" key={item.id}>
                <div className="lux-avatar">{initials(item.customerName)}</div>

                <div className="lux-review-content">
                  <div className="lux-review-meta">
                    <div>
                      <strong>{item.customerName}</strong>
                      
                    </div>

                    <span className="lux-stars">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </span>
                  </div>

                  <p>{item.comment}</p>
                </div>
              </article>
            ))
          )}
          {reviews.length > 0 && (
            <div className="lux-review-list-footer">
            <span>
                Showing {reviews.length} review
                {reviews.length > 1 ? "s" : ""}
            </span>

            <div className="review-sort">
                <label>Sort</label>

                <select>
                <option>Latest</option>
                <option>Highest Rating</option>
                <option>Lowest Rating</option>
                </select>
            </div>
            </div>
          )}
        </div>
      </div>

      <form className="lux-review-form" onSubmit={submitReview}>
        <h3>Write a Review</h3>

        <input
          type="text"
          placeholder="Your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          <option value={5}>★★★★★ 5 Stars</option>
          <option value={4}>★★★★☆ 4 Stars</option>
          <option value={3}>★★★☆☆ 3 Stars</option>
          <option value={2}>★★☆☆☆ 2 Stars</option>
          <option value={1}>★☆☆☆☆ 1 Star</option>
        </select>

        <textarea
          placeholder="Share your experience"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        <p className="review-note">
          🔒 Your review will be visible after admin approval.
        </p>
        {message && <p className="review-form-message">{message}</p>}
      </form>
    </section>
  );
}
