import { prisma } from "@/lib/prisma";
import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <AdminCategoriesClient categories={categories} />;
}