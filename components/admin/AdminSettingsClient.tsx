"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSettingsClient({
  settings,
}: {
  settings: Record<string, any>;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    storeName: settings.storeName || "Luxentir",
    storeEmail: settings.storeEmail || "support@luxentir.com",
    phoneNumber: settings.phoneNumber || "+92 300 1234567",
    whatsappNumber: settings.whatsappNumber || "923001234567",
    instagramUrl: settings.instagramUrl || "",
    facebookUrl: settings.facebookUrl || "",
    tiktokUrl: settings.tiktokUrl || "",
    defaultCurrency: settings.defaultCurrency || "PKR",
    announcementBar:
      settings.announcementBar ||
      "Cash on Delivery Only • Premium women’s western clothing",
    footerDescription:
      settings.footerDescription ||
      "Premium women’s western online clothing shop with clean silhouettes, luxury styling and Cash on Delivery only.",
    enableCOD: settings.enableCOD ?? true,
    enableFreeShipping: settings.enableFreeShipping ?? true,
    enableWhatsAppConfirmation:
      settings.enableWhatsAppConfirmation ?? true,
  });

  const saveSettings = async () => {
    setSaving(true);

    await fetch("/api/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSaving(false);
    router.refresh();
    alert("Settings saved successfully.");
  };

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Store Settings"
          subtitle="Manage Luxentir store information, social links and checkout settings."
        />

        <div className="admin-settings-grid">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Store Information</h2>
              <span>Basic brand and contact details</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Store Name</label>
                <input
                  value={form.storeName}
                  onChange={(e) =>
                    setForm({ ...form, storeName: e.target.value })
                  }
                />
              </div>

              <div className="admin-field">
                <label>Store Email</label>
                <input
                  value={form.storeEmail}
                  onChange={(e) =>
                    setForm({ ...form, storeEmail: e.target.value })
                  }
                />
              </div>

              <div className="admin-field">
                <label>Phone Number</label>
                <input
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                />
              </div>

              <div className="admin-field">
                <label>WhatsApp Number</label>
                <input
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      whatsappNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Social Media</h2>
              <span>Connect Luxentir social platforms</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field">
                <label>Instagram URL</label>
                <input
                  value={form.instagramUrl}
                  onChange={(e) =>
                    setForm({ ...form, instagramUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/luxentir"
                />
              </div>

              <div className="admin-field">
                <label>Facebook URL</label>
                <input
                  value={form.facebookUrl}
                  onChange={(e) =>
                    setForm({ ...form, facebookUrl: e.target.value })
                  }
                  placeholder="https://facebook.com/luxentir"
                />
              </div>

              <div className="admin-field">
                <label>TikTok URL</label>
                <input
                  value={form.tiktokUrl}
                  onChange={(e) =>
                    setForm({ ...form, tiktokUrl: e.target.value })
                  }
                  placeholder="https://tiktok.com/@luxentir"
                />
              </div>

              <div className="admin-field">
                <label>Default Currency</label>
                <select
                  value={form.defaultCurrency}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      defaultCurrency: e.target.value,
                    })
                  }
                >
                  <option>PKR</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Checkout Settings</h2>
              <span>Payment and delivery controls</span>
            </div>

            <div className="admin-content-switches">
              <label>
                <input
                  type="checkbox"
                  checked={form.enableCOD}
                  onChange={(e) =>
                    setForm({ ...form, enableCOD: e.target.checked })
                  }
                />
                Enable Cash on Delivery
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.enableFreeShipping}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      enableFreeShipping: e.target.checked,
                    })
                  }
                />
                Enable Free Shipping
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.enableWhatsAppConfirmation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      enableWhatsAppConfirmation:
                        e.target.checked,
                    })
                  }
                />
                Enable WhatsApp Order Confirmation
              </label>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Website Text</h2>
              <span>Announcement and footer content</span>
            </div>

            <div className="admin-form-grid">
              <div className="admin-field full">
                <label>Announcement Bar</label>
                <input
                  value={form.announcementBar}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcementBar: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-field full">
                <label>Footer Description</label>
                <textarea
                  value={form.footerDescription}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      footerDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            className="admin-secondary-btn"
            onClick={() => router.refresh()}
          >
            Reset
          </button>

          <button
            className="admin-primary-btn"
            onClick={saveSettings}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </section>
    </main>
  );
}