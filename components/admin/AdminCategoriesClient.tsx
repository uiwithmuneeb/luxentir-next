"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminCategoriesClient({
  categories,
}: {
  categories: any[];
}) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
    featured: false,
    sortOrder: 0,
    status: "Active",
  });

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function resetForm() {
    setEditingCategory(null);
    setUploadError("");

    setForm({
      name: "",
      slug: "",
      image: "",
      description: "",
      featured: false,
      sortOrder: 0,
      status: "Active",
    });
  }

  function handleNameChange(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugify(value),
    }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setUploadError("");

    const data = new FormData();
    data.append("file", file);
    data.append("type", "products");

    const res = await fetch("/api/admin/upload/product-image", {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    setUploading(false);

    if (!res.ok) {
      setUploadError(json.message || "Upload failed");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: json.url,
    }));
  }

  async function saveCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const url = editingCategory
      ? `/api/admin/categories/${editingCategory.id}`
      : "/api/admin/categories";

    const method = editingCategory ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSaving(false);
    resetForm();
    router.refresh();
  }

  async function deleteCategory(category: any) {
    if (category._count?.products > 0) {
      alert("This category has products. Move or delete products first.");
      return;
    }

    const confirmed = window.confirm(`Delete ${category.name}?`);
    if (!confirmed) return;

    await fetch(`/api/admin/categories/${category.id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  function startEdit(category: any) {
    setEditingCategory(category);

    setForm({
      name: category.name || "",
      slug: category.slug || "",
      image: category.image || "",
      description: category.description || "",
      featured: category.featured || false,
      sortOrder: category.sortOrder || 0,
      status: category.status || "Active",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Category Management"
          subtitle="Create, edit and organize Luxentir product categories."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
              <span>
                Manage category name, image, visibility and storefront order.
              </span>
            </div>

            {editingCategory && (
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form className="admin-product-form" onSubmit={saveCategory}>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Category Name</label>
                <input
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Pants"
                  required
                />
              </div>

              <div className="admin-field">
                <label>Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                  placeholder="pants"
                  required
                />
              </div>

              <div className="admin-field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sortOrder: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="admin-field full">
                <label>Category Image</label>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                  }}
                />

                {uploading && <p>Uploading category image...</p>}

                {uploadError && (
                  <p className="admin-login-error">{uploadError}</p>
                )}

                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  placeholder="/uploads/products/category-image.webp or https://..."
                />

                {form.image && (
                  <img
                    src={form.image}
                    alt="Category preview"
                    style={{
                      width: "160px",
                      height: "110px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      marginTop: "12px",
                    }}
                  />
                )}
              </div>

              <div className="admin-field full">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Short category description for storefront..."
                  rows={4}
                />
              </div>

              <div className="admin-field full">
                <label>Featured Category</label>
                <div className="admin-checks">
                  <label>
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                    />
                    Show this category on homepage
                  </label>
                </div>
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetForm}
              >
                Reset
              </button>

              <button
                type="submit"
                className="admin-primary-btn"
                disabled={saving || uploading}
              >
                {saving
                  ? "Saving..."
                  : uploading
                  ? "Uploading..."
                  : editingCategory
                  ? "Save Changes"
                  : "Add Category"}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>All Categories</h2>
              <span>Total categories: {categories.length}</span>
            </div>
          </div>

          <div className="admin-products-table">
            <div className="admin-products-head">
              <span>Category</span>
              <span>Slug</span>
              <span>Products</span>
              <span>Featured</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {categories.length === 0 ? (
              <div className="admin-empty-state">No categories added yet.</div>
            ) : (
              categories.map((category) => (
                <div className="admin-products-row" key={category.id}>
                  <div className="admin-product-cell">
                    {category.image ? (
                      <img src={category.image} alt={category.name} />
                    ) : (
                      <div
                        style={{
                          width: 54,
                          height: 70,
                          borderRadius: 12,
                          background: "#f3eadf",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        ▣
                      </div>
                    )}

                    <div>
                      <strong>{category.name}</strong>
                      <p>ID: #{category.id}</p>
                    </div>
                  </div>

                  <span>{category.slug}</span>

                  <span>{category._count?.products || 0}</span>

                  <span className="admin-pill">
                    {category.featured ? "Featured" : "No"}
                  </span>

                  <span
                    className={
                      category.status === "Active"
                        ? "admin-status active"
                        : "admin-status"
                    }
                  >
                    {category.status}
                  </span>

                  <div className="admin-actions">
                    <button onClick={() => startEdit(category)}>Edit</button>

                    <button onClick={() => deleteCategory(category)}>
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