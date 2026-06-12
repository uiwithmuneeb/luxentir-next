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
    content: "About Luxentir policy/content page",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "privacyPolicy",
    title: "Privacy Policy",
    subtitle: "Privacy page",
    content: "Customer privacy and data handling",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "termsConditions",
    title: "Terms & Conditions",
    subtitle: "Terms page",
    content: "Store terms and conditions",
    enabled: true,
    group: "Policy Pages",
  },
  {
    key: "exchangeReturns",
    title: "Exchange & Returns",
    subtitle: "Exchange policy page",
    content: "Return and exchange information",
    enabled: true,
    group: "Policy Pages",
  },
];

export default function AdminContentClient({
  sections,
}: {
  sections: any[];
}) {
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
          <ContentPanel title="Homepage Content" subtitle="Main storefront sections" sections={homepageContent} updateSection={updateSection} />

          <ContentPanel title="Marketing Content" subtitle="Social & engagement sections" sections={marketingContent} updateSection={updateSection} />

          <ContentPanel title="Policy Pages" subtitle="Store information pages" sections={policyPages} updateSection={updateSection} />

          
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