import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CollectionForm from "@/components/admin/CollectionForm";

export default function NewCollectionPage() {
  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Add Collection"
          subtitle="Create a new curated collection for Luxentir."
        />

        <div className="admin-panel">
          <CollectionForm />
        </div>
      </section>
    </main>
  );
}