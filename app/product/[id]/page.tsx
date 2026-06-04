import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ProductPrice from "@/components/ProductPrice";
import ProductGallery from "@/components/ProductGallery";
import ProductVariants from "@/components/ProductVariants";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main>
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">Product not found</span>
            <h1>Product not found</h1>
            <p>This product is not available.</p>
            <br />
            <Link className="btn gold" href="/shop">
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Product detail</span>
          <h1>{product.name}</h1>
          <p>
            A refined Luxentir statement piece with product variants, image
            gallery, size guide and Cash on Delivery messaging.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container product-detail">
          <ProductGallery
            name={product.name}
            images={
              product.images || [
                product.image,
                product.image,
                product.image,
                product.image,
              ]
            }
          />

          <div className="detail-info reveal show">
            <span className="eyebrow">New Season Collection</span>
            <h1>{product.name}</h1>

            <div className="stars">
              ★★★★★ <span style={{ color: "var(--muted)" }}>4.9 • 38 reviews</span>
            </div>

            <ProductPrice price={product.price} oldPrice={product.oldPrice} />

            <p>
              Premium western silhouette with elegant Luxentir finishing.
              Designed for polished day styling, dinner looks and luxury
              everyday wear.
            </p>

            <ProductVariants productId={product.id} />

            <div className="fit-guides">
              <details className="chart-card">
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
                  Cash on Delivery only. No online card payment is enabled in
                  this phase.
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
                  Satin blend. Gentle hand wash recommended. Steam on low heat
                  from reverse side.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Complete the look</span>
              <h2>Related products</h2>
            </div>
            <Link className="btn ghost" href="/shop">
              View all
            </Link>
          </div>

          <div className="product-grid">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}