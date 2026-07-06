import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid review status" },
        { status: 400 }
      );
    }

    await prisma.review.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: "Review status updated",
    });
  } catch (error) {
    console.error("ADMIN REVIEW PATCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.review.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    console.error("ADMIN REVIEW DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}