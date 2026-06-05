const benefits = [
  {
    title: "Premium Fabrics",
    text: "Soft, refined materials selected for comfort, structure and a luxury finish.",
    icon: "✦",
  },
  {
    title: "Cash on Delivery",
    text: "Simple and trusted shopping experience with Cash on Delivery only.",
    icon: "●",
  },
  {
    title: "Easy Exchange",
    text: "Smooth exchange support for eligible products with clear return guidance.",
    icon: "↺",
  },
  {
    title: "Luxury Packaging",
    text: "Every order is packed with a premium boutique-style presentation.",
    icon: "◇",
  },
];

export default function WhyLuxentir() {
  return (
    <section className="section tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why Luxentir</span>
            <h2>Designed for premium shopping</h2>
          </div>
          <p>
            A refined customer experience focused on quality, trust and elegant
            delivery.
          </p>
        </div>

        <div className="benefit-grid">
          {benefits.map((item) => (
            <div className="benefit-card" key={item.title}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}