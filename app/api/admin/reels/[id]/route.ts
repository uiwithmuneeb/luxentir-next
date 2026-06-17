import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const reel = await prisma.reel.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        videoUrl: body.videoUrl,
        image: body.image || "",
        status: body.status || "Active",
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/reels");

    return NextResponse.json(reel);
  } catch (error) {
    console.error("UPDATE REEL ERROR:", error);

    return NextResponse.json(
      { message: "Reel could not be updated" },
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

    await prisma.reel.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/reels");

    return NextResponse.json({
      message: "Reel deleted successfully",
    });
  } catch (error) {
    console.error("DELETE REEL ERROR:", error);

    return NextResponse.json(
      { message: "Reel could not be deleted" },
      { status: 500 }
    );
  }
}