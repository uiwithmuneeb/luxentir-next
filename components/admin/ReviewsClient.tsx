"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminToast } from "@/components/admin/AdminToast";

type Review = {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  product?: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
};

export default function ReviewsClient({
  initialReviews,
}: {
  initialReviews: Review[];
}) {
  const router = useRouter();
  const { showToast } = useAdminToast();

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Approved" | "Rejected"
  >("All");

  const filteredReviews = useMemo(() => {
    if (filter === "All") return reviews;
    return reviews.filter((review) => review.status === filter);
  }, [filter, reviews]);

  const updateStatus = async (
    id: number,
    status: "Pending" | "Approved" | "Rejected",
  ) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      showToast({
        type: "error",
        title: "Action failed",
        message: "Review status could not be updated.",
      });
      return;
    }

    setReviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    router.refresh();

    showToast({
      type: "success",
      title: "Review updated",
      message: `Review marked as ${status}.`,
    });
  };

  const deleteReview = async (id: number) => {
    const confirmed = confirm("Delete this review permanently?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      showToast({
        type: "error",
        title: "Delete failed",
        message: "Review could not be deleted.",
      });
      return;
    }

    setReviews((prev) => prev.filter((item) => item.id !== id));

    router.refresh();

    showToast({
      type: "success",
      title: "Review deleted",
    });
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <h2>Review Moderation</h2>
          <span>Only approved reviews will appear on product pages.</span>
        </div>
      </div>

      <div className="admin-review-tabs">
        {["All", "Pending", "Approved", "Rejected"].map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item as any)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="admin-reviews-list">
        {filteredReviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          filteredReviews.map((review) => (
            <div className="admin-review-row" key={review.id}>
              <div className="review-col customer">
                <strong>{review.customerName}</strong>
                <span>{review.product?.name || "Product not found"}</span>
              </div>

              <div className="review-col stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <div className="review-col comment">{review.comment}</div>

              <div className="review-col status">
                <em className={`review-badge ${review.status.toLowerCase()}`}>
                  {review.status}
                </em>
              </div>

              <div className="review-col actions">
                <button
                  type="button"
                  onClick={() => updateStatus(review.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() => updateStatus(review.id, "Rejected")}
                >
                  Reject
                </button>

                <button
                  type="button"
                  className="danger"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
