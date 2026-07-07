"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CollectionForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    status: "Active",
    featured: false,
    sortOrder: "0",
  });

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: createSlug(value),
    }));
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload/collection", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    let data: any = {};

    try {
      data = JSON.parse(text);
    } catch {
      console.error(text);
      setUploading(false);
      setMessage("Server JSON return nahi kar raha.");
      return;
    }
    setUploading(false);

    if (!res.ok) {
      setMessage(data.message || "Image upload failed.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: data.url,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder || 0),
    };

    const res = await fetch("/api/admin/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      setMessage("Collection could not be saved.");
      return;
    }

    router.push("/admin/collections");
    router.refresh();
  };

  return (
    <div className="admin-form-card">
      <div className="admin-panel-head">
        <div>
          <h2>Add New Collection</h2>
          <span>Create curated collection details for Luxentir storefront</span>
        </div>
      </div>

      <form className="admin-product-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label>Collection Name</label>
            <input
              placeholder="Summer Collection"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div className="admin-field">
            <label>Slug</label>
            <input
              placeholder="summer-collection"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>

          <div className="admin-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="admin-field">
            <label>Sort Order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: e.target.value })
              }
            />
          </div>

          <div className="admin-field full">
            <label>Collection Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
            />

            {uploading && (
              <p className="admin-form-message">Uploading image...</p>
            )}

            {form.image && (
              <div className="admin-image-preview">
                <img src={form.image} alt="Collection preview" />
                <span>{form.image}</span>
              </div>
            )}
          </div>

          <div className="admin-field full">
            <label>Collection Description</label>
            <textarea
              placeholder="Write a short SEO-friendly description for this collection..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="admin-field full">
            <label>Featured Collection</label>
            <div className="admin-checks">
              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Show as featured collection
              </label>
            </div>
          </div>
        </div>

        {message && <p className="admin-form-message">{message}</p>}

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() => router.push("/admin/collections")}
            disabled={loading || uploading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={loading || uploading}
          >
            {loading ? "Saving..." : "Publish Collection"}
          </button>
        </div>
      </form>
    </div>
  );
}