export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ReviewsClient from "@/components/admin/ReviewsClient";

export default async function AdminReviewsPage() {
  let reviews: any[] = [];
  let totalReviews = 0;
  let pendingReviews = 0;
  let approvedReviews = 0;
  let rejectedReviews = 0;

  try {
    reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
      },
    });

    totalReviews = await prisma.review.count();
    pendingReviews = await prisma.review.count({
      where: { status: "Pending" },
    });
    approvedReviews = await prisma.review.count({
      where: { status: "Approved" },
    });
    rejectedReviews = await prisma.review.count({
      where: { status: "Rejected" },
    });
  } catch (error) {
    console.error("ADMIN REVIEWS PAGE ERROR:", error);
  }

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Customer Reviews"
          subtitle="Approve, reject and manage product reviews submitted by customers."
        />

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span>Total Reviews</span>
            <strong>{totalReviews}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Pending</span>
            <strong>{pendingReviews}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Approved</span>
            <strong>{approvedReviews}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Rejected</span>
            <strong>{rejectedReviews}</strong>
          </div>
        </div>

        <ReviewsClient initialReviews={reviews} />
      </section>
    </main>
  );
}