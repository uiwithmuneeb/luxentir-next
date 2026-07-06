import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-card">
        <span className="eyebrow">404</span>

        <h1>Page not found</h1>

        <p>
          The page or collection you are looking for may be unavailable,
          removed, or temporarily inactive.
        </p>

        <div className="not-found-actions">
          <Link href="/collections" className="btn gold">
            Back to Collections
          </Link>

          <Link href="/shop" className="btn ghost">
            Shop Now
          </Link>
        </div>
      </div>
    </main>
  );
}