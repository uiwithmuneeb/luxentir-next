"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const defaultSections = [
  {
    key: "heroSection",
    title: "Hero Section",
    subtitle: "Main homepage banner",
    content: "Homepage hero banner visibility",
    enabled: true,
    group: "Homepage Content",
  },
  {
    key: "homepageCategories",
    title: "Homepage Categories",
    subtitle: "Category cards section",
    content: "Pants, Shirts, Blazers, Co-ords and Party Wear sections",
    enabled: true,
    group: "Homepage Content",
  },
  {
    key: "featuredCollection",
    title: "Featured Collection",
    subtitle: "Featured products area",
    content: "Products marked as featured will appear here",
    enabled: true,
    group: "Homepage Content",
  },
  {
    key: "whyLuxentir",
    title: "Why Luxentir",
    subtitle: "Brand trust section",
    content: "Premium quality, COD and luxury styling benefits",
    enabled: true,
    group: "Homepage Content",
  },
  {
    key: "bestSellers",
    title: "Best Sellers",
    subtitle: "Top selling products",
    content: "Best selling products section visibility",
    enabled: true,
    group: "Homepage Content",
  },
  {
    key: "reelsSection",
    title: "Instagram Reels",
    subtitle: "Social video section",
    content: "Homepage reels / Instagram video section",
    enabled: true,
    group: "Marketing Content",
  },
  {
    key: "newsletter",
    title: "Newsletter Section",
    subtitle: "Email signup section",
    content: "Newsletter subscription block",
    enabled: true,
    group: "Marketing Content",
  },
  {
    key: "announcementBar",
    title: "Announcement Bar",
    subtitle: "Top website strip",
    content: "Store announcement visibility",
    enabled: true,
    group: "Marketing Content",
  },
  {
    key: "homepagePromotions",
    title: "Homepage Promotions",
    subtitle: "Promo blocks and offers",
    content: "Promotional content section",
    enabled: true,
    group: "Marketing Content",
  },
  {
    key: "aboutUs",
    title: "About Us",
    subtitle: "Brand page content",
    content:
      "Luxentir is a premium women’s western clothing brand focused on elegant silhouettes, refined styling and a boutique shopping experience.",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "privacyPolicy",
    title: "Privacy Policy",
    subtitle: "Privacy page",
    content:
      "We collect only the information required to process orders, provide support and improve the Luxentir shopping experience.",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "termsConditions",
    title: "Terms & Conditions",
    subtitle: "Terms page",
    content:
      "By using Luxentir, customers agree to our order, exchange, delivery and Cash on Delivery terms.",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "exchangeReturns",
    title: "Exchange & Returns",
    subtitle: "Exchange policy page",
    content:
      "Eligible products can be exchanged according to Luxentir’s exchange policy. Items must be unused, unworn and returned with original packaging.",
    enabled: true,
    group: "Policy Pages",
  },
];

export default function AdminContentClient({ sections }: { sections: any[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const mergedSections = defaultSections.map((item) => {
    const saved = sections.find((section) => section.key === item.key);

    return {
      ...item,
      title: saved?.title || item.title,
      subtitle: saved?.subtitle || item.subtitle,
      content: saved?.content || item.content,
      enabled: saved?.enabled ?? item.enabled,
    };
  });

  const [contentSections, setContentSections] = useState(mergedSections);

  const updateSection = (key: string, value: boolean) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.key === key ? { ...section, enabled: value } : section
      )
    );
  };

  const updateContent = (key: string, value: string) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.key === key ? { ...section, content: value } : section
      )
    );
  };

  const saveContent = async () => {
    setSaving(true);

    await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections: contentSections,
      }),
    });

    setSaving(false);
    router.refresh();
    alert("Content settings saved successfully.");
  };

  const homepageContent = contentSections.filter(
    (section) => section.group === "Homepage Content"
  );

  const marketingContent = contentSections.filter(
    (section) => section.group === "Marketing Content"
  );

  const policyPages = contentSections.filter(
    (section) => section.group === "Policy Pages"
  );

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Content Management"
          subtitle="Manage homepage sections, policies and marketing content."
        />

        <div className="admin-content-grid">
          <ContentPanel
            title="Homepage Content"
            subtitle="Main storefront sections"
            sections={homepageContent}
            updateSection={updateSection}
          />

          <ContentPanel
            title="Marketing Content"
            subtitle="Social & engagement sections"
            sections={marketingContent}
            updateSection={updateSection}
          />

          <PolicyPanel
            title="Policy Pages"
            subtitle="Store information pages"
            sections={policyPages}
            updateSection={updateSection}
            updateContent={updateContent}
          />
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
            onClick={saveContent}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Content"}
          </button>
        </div>
      </section>
    </main>
  );
}

function ContentPanel({
  title,
  subtitle,
  sections,
  updateSection,
}: {
  title: string;
  subtitle: string;
  sections: any[];
  updateSection: (key: string, value: boolean) => void;
}) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div className="admin-task-list">
        {sections.map((section) => (
          <div className="admin-content-row" key={section.key}>
            <div className="admin-content-info">
              <strong>{section.title}</strong>
              <p>{section.subtitle}</p>
            </div>

            <div className="admin-content-status">
              <span
                className={
                  section.enabled
                    ? "admin-status-active"
                    : "admin-status-disabled"
                }
              >
                {section.enabled ? "Enabled" : "Disabled"}
              </span>

              <input
                type="checkbox"
                checked={section.enabled}
                onChange={(e) =>
                  updateSection(section.key, e.target.checked)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PolicyPanel({
  title,
  subtitle,
  sections,
  updateSection,
  updateContent,
}: {
  title: string;
  subtitle: string;
  sections: any[];
  updateSection: (key: string, value: boolean) => void;
  updateContent: (key: string, value: string) => void;
}) {
  return (
    <div className="admin-panel" style={{ gridColumn: "1 / -1" }}>
      <div className="admin-panel-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div style={{ display: "grid", gap: 18 }}>
        {sections.map((section) => (
          <div
            key={section.key}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 130px",
              gap: 20,
              alignItems: "flex-start",
              padding: 18,
              border: "1px solid rgba(196, 153, 83, 0.22)",
              borderRadius: 18,
              background: "#fffaf3",
            }}
          >
            <div>
              <strong>{section.title}</strong>
              <p style={{ marginTop: 6, opacity: 0.65 }}>
                {section.subtitle}
              </p>
            </div>

            <textarea
              value={section.content}
              onChange={(e) => updateContent(section.key, e.target.value)}
              rows={7}
              style={{
                width: "100%",
                borderRadius: 16,
                border: "1px solid rgba(196, 153, 83, 0.28)",
                padding: 16,
                resize: "vertical",
                fontSize: 14,
                lineHeight: 1.7,
              }}
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "flex-end",
                fontWeight: 800,
                color: section.enabled ? "#0a9b4b" : "#c01818",
              }}
            >
              {section.enabled ? "Enabled" : "Disabled"}
              <input
                type="checkbox"
                checked={section.enabled}
                onChange={(e) =>
                  updateSection(section.key, e.target.checked)
                }
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}