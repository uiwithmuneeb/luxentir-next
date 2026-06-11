import { prisma } from "@/lib/prisma";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export default async function AdminProductsPage() {
  let products: any[] = [];

  try {
    products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("ADMIN PRODUCTS ERROR:", error);
  }

  return <AdminProductsClient products={products} />;
}