import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function GET() {
  return NextResponse.json({
    message: "Product image upload API is working",
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = String(formData.get("type") || "products");

    if (!file) {
      return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG or WebP images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image size must be less than 5MB" },
        { status: 400 }
      );
    }

    const folder = type === "gallery" ? "gallery" : "products";
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = file.name.split(".").pop() || "jpg";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const fileName = `${Date.now()}-${safeName}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${folder}/${fileName}`,
    });
  } catch (error) {
    console.error("PRODUCT IMAGE UPLOAD ERROR:", error);

    return NextResponse.json(
      { message: "Image could not be uploaded", error: String(error) },
      { status: 500 }
    );
  }
}