export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-slide active">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury fashion campaign"
        />
      </div>

      <div className="container hero-content">
        <div className="hero-copy fade-in">
          <span className="eyebrow">New Season Collection</span>
          <h1>Western luxury boutique soul.</h1>
          <p>
            Discover premium pants, shirts, blazer sets, casual co-ords and
            party wear designed for confident modern women.
          </p>

          <div className="hero-buttons">
            <a className="btn light" href="/shop">
              Shop New Arrivals
            </a>
            <a
              className="btn ghost"
              style={{
                color: "white",
                borderColor: "rgba(255,255,255,.55)",
              }}
              href="/collections"
            >
              Explore Collections
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}