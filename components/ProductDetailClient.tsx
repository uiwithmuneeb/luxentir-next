"use client";

import { useEffect, useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductVariants from "@/components/ProductVariants";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ProductPrice from "@/components/ProductPrice";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  images?: string[];
  badge: string;
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

        <ProductPrice price={product.price} oldPrice={product.oldPrice} />

        <p>
          Premium western silhouette with elegant Luxentir finishing. Designed
          for polished day styling, dinner looks and luxury everyday wear.
        </p>

        <ProductVariants productId={product.id} image={activeImage} />

        <div className="fit-guides">
          <details className="chart-card" open>
            <summary>Size chart</summary>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hip</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>32 in</td>
                    <td>26 in</td>
                    <td>35 in</td>
                    <td>Regular</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>34 in</td>
                    <td>28 in</td>
                    <td>37 in</td>
                    <td>Regular</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>36 in</td>
                    <td>30 in</td>
                    <td>39 in</td>
                    <td>Regular</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>38 in</td>
                    <td>32 in</td>
                    <td>41 in</td>
                    <td>Regular</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>40 in</td>
                    <td>34 in</td>
                    <td>43 in</td>
                    <td>Regular</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>

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