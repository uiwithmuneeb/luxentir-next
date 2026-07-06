export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import EditCollectionForm from "@/components/admin/EditCollectionForm";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <AdminHeader
          title="Edit Collection"
          subtitle="Update collection details, image and storefront visibility."
        />

        <EditCollectionForm collection={collection} />
      </section>
    </main>
  );
}