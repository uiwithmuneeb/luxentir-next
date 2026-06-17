"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminReelsClient({ reels }: { reels: any[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [editingReel, setEditingReel] = useState<any>(null);

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    image: "",
    status: "Active",
    sortOrder: 0,
  });

  const resetForm = () => {
    setEditingReel(null);
    setForm({
      title: "",
      videoUrl: "",
      image: "",
      status: "Active",
      sortOrder: 0,
    });
  };

  const saveReel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const url = editingReel
      ? `/api/admin/reels/${editingReel.id}`
      : "/api/admin/reels";

    await fetch(url, {
      method: editingReel ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSaving(false);
    resetForm();
    router.refresh();
  };

  const deleteReel = async (id: number) => {
    const confirmed = window.confirm("Delete this reel?");
    if (!confirmed) return;

    await fetch(`/api/admin/reels/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Reels Management"
          subtitle="Add, edit and manage homepage Instagram reels."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>{editingReel ? "Edit Reel" : "Add New Reel"}</h2>
              <span>Use Instagram, TikTok, YouTube Shorts or video links</span>
            </div>

            {editingReel && (
              <button className="admin-secondary-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          <form className="admin-product-form" onSubmit={saveReel}>
            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Reel Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Summer Collection Reel"
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
                <label>Video URL</label>
                <input
                  required
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm({ ...form, videoUrl: e.target.value })
                  }
                  placeholder="https://www.instagram.com/reel/..."
                />
              </div>

              <div className="admin-field full">
                <label>Thumbnail Image URL</label>
                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  placeholder="https://image-url.com/reel-thumbnail.jpg"
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="admin-primary-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingReel
                  ? "Save Changes"
                  : "Add Reel"}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Reels</h2>
              <span>Total reels: {reels.length}</span>
            </div>
          </div>

          <div className="admin-reels-grid">
            {reels.length === 0 ? (
              <div className="admin-empty-state">No reels added yet.</div>
            ) : (
              reels.map((reel) => (
                <div className="admin-reel-card" key={reel.id}>
                  <div className="admin-reel-thumb">
                    {reel.image ? (
                      <img src={reel.image} alt={reel.title} />
                    ) : (
                      <span>🎬</span>
                    )}
                  </div>

                  <div>
                    <h3>{reel.title}</h3>
                    <p>Status: {reel.status}</p>
                    <p>Sort Order: {reel.sortOrder}</p>

                    <a href={reel.videoUrl} target="_blank">
                      Open Video
                    </a>

                    <div className="admin-actions">
                      <button
                        onClick={() => {
                          setEditingReel(reel);
                          setForm({
                            title: reel.title,
                            videoUrl: reel.videoUrl,
                            image: reel.image || "",
                            status: reel.status || "Active",
                            sortOrder: reel.sortOrder || 0,
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => deleteReel(reel.id)}>
                        Delete
                      </button>
                    </div>
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