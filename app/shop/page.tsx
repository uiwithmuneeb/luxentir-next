import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container fade-in">
          <span className="eyebrow">Shop Luxentir</span>
          <h1>Premium western wear</h1>
          <p>
            Browse Luxentir pants, shirts/T-shirts, premium blazer & pants sets,
            casual co-ord sets and party wear premium edits.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ShopClient />
        </div>
      </section>
    </main>
  );
}