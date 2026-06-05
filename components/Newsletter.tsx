export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <span className="eyebrow">Exclusive Access</span>

          <h2>Join The Luxentir Club</h2>

          <p>
            Be first to discover new collections, premium edits and exclusive
            offers.
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button
              type="submit"
              className="btn gold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}