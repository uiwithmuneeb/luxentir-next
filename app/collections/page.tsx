export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CollectionsPage() {
  let collections: any[] = [];

  try {
    collections = await prisma.collection.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  } catch (error) {
    console.error("COLLECTIONS PAGE ERROR:", error);
  }

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Collections</span>
          <h1>Premium Women’s Fashion Collections</h1>
          <p>
            Explore curated Luxentir fashion edits featuring elegant shirts,
            premium pants, blazers, co-ord sets and party wear for modern women.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {collections.length === 0 ? (
            <p>No collections available yet.</p>
          ) : (
            <div className="category-grid">
              {collections.map((collection) => (
                <Link
                  href={`/collections/${collection.id}`}
                  className="category-card"
                  key={collection.id}
                >
                  <img
                    src={collection.image || "/placeholder.png"}
                    alt={collection.name}
                  />

                  <div>
                    <span className="eyebrow">Collection</span>
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}