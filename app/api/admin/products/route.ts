import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseSlug = slugify(body.slug || body.name);
    let finalSlug = baseSlug;

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: finalSlug,
      },
    });

    if (existingProduct) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    }

    const categorySlug = slugify(body.category || "Uncategorized");

    const galleryImages = Array.isArray(body.gallery)
      ? body.gallery.filter(Boolean)
      : String(body.gallery || body.image || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

    const galleryValue = JSON.stringify(galleryImages);


  const product = await prisma.product.create({
  data: {
    name: body.name,
    slug: finalSlug,

    category: {
      connectOrCreate: {
        where: {
          slug: categorySlug,
        },
        create: {
          name: body.category || "Uncategorized",
          slug: categorySlug,
        },
      },
    },

    price: Number(body.price),

    comparePrice: body.comparePrice
      ? Number(body.comparePrice)
      : null,

    badge: body.badge || "NEW",

    description: body.description || "",

    image: body.image || "",

    gallery: galleryValue,

    sizes: Array.isArray(body.sizes)
      ? JSON.stringify(body.sizes)
      : body.sizes || "[]",

    colors: Array.isArray(body.colors)
      ? JSON.stringify(body.colors)
      : body.colors || "[]",

    stock: Number(body.stock || 0),

    status: body.status || "Active",

    featured: Boolean(body.featured),

    collections: {
      create: (body.collections || []).map((collectionId: number) => ({
        collection: {
          connect: {
            id: collectionId,
          },
        },
      })),
    },
  },

  include: {
    collections: true,
  },
});

    return NextResponse.json(product);
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);

    return NextResponse.json(
      {
        message: "Product could not be created",
        error: String(error),
      },
      { status: 500 }
    );
  }
}