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

    const banner = await prisma.heroBanner.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        subtitle: body.subtitle || "",
        image: body.image,
        buttonText: body.buttonText || "",
        buttonLink: body.buttonLink || "",
        status: body.status || "Active",
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/banners");

    return NextResponse.json(banner);
  } catch (error) {
    console.error("UPDATE BANNER ERROR:", error);

    return NextResponse.json(
      { message: "Banner could not be updated" },
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

    await prisma.heroBanner.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/banners");

    return NextResponse.json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BANNER ERROR:", error);

    return NextResponse.json(
      { message: "Banner could not be deleted" },
      { status: 500 }
    );
  }
}