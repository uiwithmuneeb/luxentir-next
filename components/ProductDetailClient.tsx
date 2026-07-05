"use client";

import { useEffect, useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductVariants from "@/components/ProductVariants";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ProductPrice from "@/components/ProductPrice";

type Product = {
  id: number;
  name: string;
  category:
    | string
    | {
        name: string;
      }
    | null;
  price: number;
  comparePrice?: number | null;
  oldPrice?: number | null;
  image: string;
  images?: string[];
  badge?: string | null;
  description?: string | null;
};

export default function ProductDetailClient({
  product,
  images,
}: {
  product: Product;
  images: string[];
}) {
  const [activeImage, setActiveImage] = useState(images[0]);
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("luxentir-recent") || "[]"
    );

    const updated = [
      product.id,
      ...saved.filter((id: number) => id !== product.id),
    ].slice(0, 8);

    localStorage.setItem(
      "luxentir-recent",
      JSON.stringify(updated)
    );
  }, [product.id]);

  return (
    <div className="container product-detail">
      <ProductGallery
        name={product.name}
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />

      <div className="detail-info reveal show">
        <span className="eyebrow">New Season Collection</span>
        <h1>{product.name}</h1>

        <div className="stars">
          ★★★★★ <span style={{ color: "var(--muted)" }}>4.9 • 38 reviews</span>
        </div>

        <ProductPrice
          price={product.price}
          oldPrice={product.comparePrice}
        />

        <p>{product.description}</p>

        <ProductVariants
            productId={product.id}
            name={product.name}
            category={
              typeof product.category === "string"
                ? product.category
                : product.category?.name || "Uncategorized"
            }
            price={product.price}
            image={activeImage}
            sizes={(product as any).sizes}
            colors={(product as any).colors}
            stock={(product as any).stock}
          />

            

        <div className="detail-actions">
          <AddToWishlistButton id={product.id} />
        </div>

        <div className="accordions">
          <details className="acc" open>
            <summary>Payment method</summary>
            <p>
              Cash on Delivery only. No online card payment is enabled in this
              phase.
            </p>
          </details>

          <details className="acc">
            <summary>Shipping & returns</summary>
            <p>
              Premium packaging, order tracking and easy exchange policy for
              eligible products.
            </p>
          </details>

          <details className="acc">
            <summary>Fabric & care</summary>
            <p>
              Satin blend. Gentle hand wash recommended. Steam on low heat from
              reverse side.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}