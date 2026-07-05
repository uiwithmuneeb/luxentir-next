import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Categories() {
  const categories = await prisma.category.findMany({
    where: {
      status: "Active",
      featured: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  if (!categories.length) return null;

  return (
    <section className="section tight categories-section">
      <div className="container">
        <div className="section-head between">
          <div>
            <span className="eyebrow">Curated Categories</span>
            <h2>Shop by Category</h2>
          </div>

          <Link href="/shop" className="view-all-link">
            View all

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        <div className="category-circle-list">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-circle-card"
            >
              <div className="circle-image">
                <img
                  src={cat.image || "/placeholder.png"}
                  alt={cat.name}
                  loading="lazy"
                />
              </div>

              <span className="circle-label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}