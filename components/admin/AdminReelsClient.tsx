"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminReelsClient({ reels }: { reels: any[] }) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [editingReel, setEditingReel] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    image: "",
    status: "Active",
    sortOrder: 0,
  });

  const resetForm = () => {
    setEditingReel(null);
    setUploadError("");
    setForm({
      title: "",
      videoUrl: "",
      image: "",
      status: "Active",
      sortOrder: 0,
    });
  };

  const uploadReelVideo = async (file: File) => {
    setUploadError("");

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = async () => {
      window.URL.revokeObjectURL(video.src);

      if (video.duration < 5 || video.duration > 10) {
        setUploadError("Reel duration must be between 5 and 10 seconds.");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setUploadError("Reel size must be less than 50MB.");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload/reel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setUploading(false);

      if (!res.ok) {
        setUploadError(data.message || "Upload failed");
        return;
      }

      setForm((prev) => ({
        ...prev,
        videoUrl: data.url,
      }));
    };

    video.src = URL.createObjectURL(file);
  };

  const saveReel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError("");

    if (!form.videoUrl.trim()) {
      setUploadError("Please upload a reel video or paste a video URL.");
      return;
    }

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
          subtitle="Add, edit and manage homepage reels."
        />

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2>{editingReel ? "Edit Reel" : "Add New Reel"}</h2>
              <span>Upload a short video or paste a direct video URL.</span>
            </div>

            {editingReel && (
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetForm}
              >
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
                <label>Upload Reel Video</label>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadReelVideo(file);
                  }}
                />

                <small>
                  Allowed: MP4, MOV, WebM • Duration: 5–10 sec • Max size:
                  50MB
                </small>

                {uploading && <p>Uploading reel...</p>}
                {uploadError && <p className="admin-login-error">{uploadError}</p>}

                <div style={{ margin: "14px 0", fontWeight: 800 }}>OR</div>

                <label>Video URL (Optional)</label>
                <input
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm({ ...form, videoUrl: e.target.value })
                  }
                  placeholder="/uploads/reels/video.mp4 or direct .mp4 URL"
                />

                {form.videoUrl && (
                  <video
                    src={form.videoUrl}
                    controls
                    muted
                    style={{
                      width: "180px",
                      borderRadius: "16px",
                      marginTop: "12px",
                    }}
                  />
                )}
              </div>

              <div className="admin-field full">
                <label>Thumbnail Image URL (Optional)</label>
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
                disabled={saving || uploading}
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
                    {reel.videoUrl ? (
                      <video src={reel.videoUrl} muted playsInline />
                    ) : reel.image ? (
                      <img src={reel.image} alt={reel.title} />
                    ) : (
                      <span>🎬</span>
                    )}
                  </div>

                  <div>
                    <h3>{reel.title}</h3>
                    <p>Status: {reel.status}</p>
                    <p>Sort Order: {reel.sortOrder}</p>

                    {reel.videoUrl && (
                      <a href={reel.videoUrl} target="_blank">
                        Open Video
                      </a>
                    )}

                    <div className="admin-actions">
                      <button
                        onClick={() => {
                          setEditingReel(reel);
                          setUploadError("");
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

                      <button onClick={() => deleteReel(reel.id)}>Delete</button>
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