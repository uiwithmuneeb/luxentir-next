import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const collection = await prisma.collection.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        image: body.image || null,
        status: body.status || "Active",
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    revalidatePath("/collections");
    revalidatePath(`/collections/${collection.id}`);
    revalidatePath("/admin/collections");

    return NextResponse.json(collection);
  } catch (error) {
    console.error("UPDATE COLLECTION ERROR:", error);

    return NextResponse.json(
      { message: "Collection could not be updated", error: String(error) },
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

    await prisma.productCollection.deleteMany({
      where: {
        collectionId: Number(id),
      },
    });

    await prisma.collection.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/collections");
    revalidatePath("/admin/collections");

    return NextResponse.json({
      message: "Collection deleted successfully",
    });
  } catch (error) {
    console.error("DELETE COLLECTION ERROR:", error);

    return NextResponse.json(
      { message: "Collection could not be deleted", error: String(error) },
      { status: 500 }
    );
  }
}