export default function InstagramGallery() {
  const images = [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Follow @Luxentir</span>
            <h2>Instagram Gallery</h2>
          </div>
          <p>
            Inspiration, styling moments and premium fashion edits.
          </p>
        </div>

        <div className="insta-grid">
          {images.map((image, index) => (
            <div className="insta-card" key={index}>
              <img src={image} alt="Luxentir Fashion" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}