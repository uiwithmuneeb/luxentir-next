import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function fileToBase64(file: File) {
  return file.arrayBuffer().then((buffer) => {
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:${file.type};base64,${base64}`;
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Cloudinary product image upload API is working",
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

    const folder = type === "gallery" ? "luxentir/gallery" : "luxentir/products";
    const base64File = await fileToBase64(file);

    const result = await cloudinary.uploader.upload(base64File, {
      folder,
      resource_type: "image",
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("CLOUDINARY PRODUCT IMAGE UPLOAD ERROR:", error);

    return NextResponse.json(
      { message: "Image could not be uploaded", error: String(error) },
      { status: 500 }
    );
  }
}