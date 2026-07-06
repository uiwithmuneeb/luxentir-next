"use client";

import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminCollectionsClient({
  collections,
}: {
  collections: any[];
}) {
  const router = useRouter();

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Collection Management"
          subtitle="Create and manage featured product collections for Luxentir."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Collections</h2>
              <span>
                Manage seasonal, featured and curated fashion collections
              </span>
            </div>

            <button
              className="admin-primary-btn"
              onClick={() => router.push("/admin/collections/new")}
            >
              + Add Collection
            </button>
          </div>

          <div className="admin-products-table">
            <div className="admin-products-head">
              <span>Collection</span>
              <span>Status</span>
              <span>Featured</span>
              <span>Sort</span>
              <span>Actions</span>
            </div>

            {collections.length === 0 ? (
              <div className="admin-products-row">
                <span>No collections found.</span>
              </div>
            ) : (
              collections.map((collection) => (
                <div
                  className="admin-products-row"
                  key={collection.id}
                >
                  <div className="admin-product-cell">
                    {collection.image ? (
                      <img
                        src={collection.image}
                        alt={collection.name}
                      />
                    ) : (
                      <img
                        src="/placeholder.png"
                        alt="Collection"
                      />
                    )}

                    <div>
                      <strong>{collection.name}</strong>
                      <p>{collection.slug}</p>
                    </div>
                  </div>

                  <span>{collection.status}</span>

                  <span className="admin-pill">
                    {collection.featured ? "Yes" : "No"}
                  </span>

                  <span>{collection.sortOrder}</span>

                  <div className="admin-actions">
                    <button
                      onClick={() =>
                        router.push(
                          `/admin/collections/${collection.id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const ok = window.confirm(
                          `Delete "${collection.name}"?`
                        );

                        if (!ok) return;

                        await fetch(
                          `/api/admin/collections/${collection.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        router.refresh();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}