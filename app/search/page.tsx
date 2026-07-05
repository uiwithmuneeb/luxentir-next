import { prisma } from "@/lib/prisma";
import SearchClient from "@/components/SearchClient";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const products = await prisma.product.findMany({
    where: {
      status: "Active",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      status: "Active",
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <SearchClient products={products} categories={categories} />;
}