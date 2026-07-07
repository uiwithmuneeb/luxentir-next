"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/navigation";

export default function AdminBannersClient({ banners }: { banners: any[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    status: "Active",
    sortOrder: 0,
  });

  const [editingBanner, setEditingBanner] = useState<any>(null);

  const uploadBannerImage = async (file: File) => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "banners");

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setMessage(data.message || "Banner image upload failed.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: data.url,
    }));
  };

  const saveBanner = async () => {
    setMessage("");

    const endpoint = editingBanner
      ? `/api/admin/banners/${editingBanner.id}`
      : "/api/admin/banners";

    const method = editingBanner ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("Banner could not be saved.");
      return;
    }

    router.refresh();

    setForm({
      title: "",
      subtitle: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      status: "Active",
      sortOrder: 0,
    });

    setEditingBanner(null);
    setMessage("Banner saved successfully.");
  };

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Hero Banner Management"
          subtitle="Manage homepage slider banners."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>{editingBanner ? "Edit Banner" : "Add New Banner"}</h2>
              <span>Homepage hero slider management</span>
            </div>
          </div>

          <div className="admin-form-grid">
            <input
              className="field"
              placeholder="Banner Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="field"
              placeholder="Button Text"
              value={form.buttonText}
              onChange={(e) =>
                setForm({ ...form, buttonText: e.target.value })
              }
            />

            <textarea
              className="field"
              placeholder="Banner Subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />

            <input
              className="field"
              placeholder="Button Link"
              value={form.buttonLink}
              onChange={(e) =>
                setForm({ ...form, buttonLink: e.target.value })
              }
            />

            <div className="admin-field full">
              <label>Banner Image</label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadBannerImage(file);
                }}
              />

              {uploading && (
                <p className="admin-form-message">Uploading banner image...</p>
              )}

              <input
                className="field"
                placeholder="Banner Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />

              {form.image && (
                <div className="admin-image-preview">
                  <img src={form.image} alt="Banner preview" />
                  <span>{form.image}</span>
                </div>
              )}
            </div>

            <input
              className="field"
              type="number"
              placeholder="Sort Order"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  sortOrder: Number(e.target.value),
                })
              }
            />

            <select
              className="field"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {message && <p className="admin-form-message">{message}</p>}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <button
              className="admin-primary-btn"
              onClick={saveBanner}
              disabled={uploading}
            >
              {editingBanner ? "Update Banner" : "Save Banner"}
            </button>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2>Hero Banners</h2>
            <span>Total banners: {banners.length}</span>
          </div>

          <div className="admin-products-table">
            {banners.map((banner) => (
              <div key={banner.id} className="admin-products-row">
                <div className="admin-product-cell">
                  <img src={banner.image} alt={banner.title} />

                  <div>
                    <strong>{banner.title}</strong>
                    <p>Sort Order: {banner.sortOrder}</p>
                  </div>
                </div>

                <span>{banner.status}</span>

                <div className="admin-actions">
                  <button
                    onClick={() => {
                      setEditingBanner(banner);

                      setForm({
                        title: banner.title,
                        subtitle: banner.subtitle || "",
                        image: banner.image,
                        buttonText: banner.buttonText || "",
                        buttonLink: banner.buttonLink || "",
                        status: banner.status,
                        sortOrder: banner.sortOrder || 0,
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await fetch(`/api/admin/banners/${banner.id}`, {
                        method: "DELETE",
                      });

                      router.refresh();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}