import { prisma } from "@/lib/prisma";
import WishlistClient from "@/components/WishlistClient";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return <WishlistClient products={products} />;
}