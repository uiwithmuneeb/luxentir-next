import Link from "next/link";

export default function FeaturedCollection() {
  return (
    <section className="featured-collection">
      <div className="container">
        <div className="featured-content">
          <span className="eyebrow">The New Edit</span>

          <h2>
            Luxury tailoring for
            modern women
          </h2>

          <p>
            Discover elevated silhouettes, premium fabrics and timeless western
            essentials designed for confident everyday luxury.
          </p>

          <Link href="/collections" className="btn gold">
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}