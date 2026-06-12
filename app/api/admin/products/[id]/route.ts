import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const categorySlug = slugify(body.category || "Uncategorized");

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        slug: slugify(body.name),
        price: Number(body.price),
        comparePrice: body.comparePrice ? Number(body.comparePrice) : null,
        badge: body.badge || "NEW",
        status: body.status || "Active",
        image: body.image || "",
        description: body.description || "",
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
      },
    });

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath(`/product/${product.id}`);

    return NextResponse.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Product could not be updated", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin/products");

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Product could not be deleted", error: String(error) },
      { status: 500 }
    );
  }
}