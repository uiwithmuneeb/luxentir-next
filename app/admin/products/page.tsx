export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export default async function AdminProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];
  let collections: any[] = [];

  try {
    products = await prisma.product.findMany({
      include: {
        category: true,
        collections: {
          include: {
            collection: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    categories = await prisma.category.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    collections = await prisma.collection.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  } catch (error) {
    console.error("ADMIN PRODUCTS ERROR:", error);
  }

  return (
    <AdminProductsClient
      products={products}
      categories={categories}
      collections={collections}
    />
  );
}