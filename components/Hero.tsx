"use client";

import { useEffect, useState } from "react";

type Banner = {
  id: number;
  title: string;
  subtitle?: string | null;
  image: string;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export default function Hero({ banners = [] }: { banners?: Banner[] }) {
  const fallbackBanner = {
    id: 0,
    title: "Western luxury boutique soul.",
    subtitle:
      "Discover premium pants, shirts, blazer sets, casual co-ords and party wear designed for confident modern women.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Shop New Arrivals",
    buttonLink: "/shop",
  };

  const slides = banners.length > 0 ? banners : [fallbackBanner];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeBanner = slides[activeIndex];

  return (
    <section className="hero">
      {slides.map((banner, index) => (
        <div
          className={`hero-slide ${index === activeIndex ? "active" : ""}`}
          key={banner.id}
        >
          <img src={banner.image} alt={banner.title} />
        </div>
      ))}

      <div className="container hero-content">
        <div className="hero-copy fade-in">
          <span className="eyebrow">New Season Collection</span>

          <h1>{activeBanner.title}</h1>

          <p>{activeBanner.subtitle}</p>

          <div className="hero-buttons">
            <a className="btn light" href={activeBanner.buttonLink || "/shop"}>
              {activeBanner.buttonText || "Shop New Arrivals"}
            </a>

            <a
              className="btn ghost"
              href="/collections"
              style={{
                color: "white",
                borderColor: "rgba(255,255,255,.55)",
              }}
            >
              Explore Collections
            </a>
          </div>

          {slides.length > 1 && (
            <div className="hero-dots">
              {slides.map((banner, index) => (
                <button
                  key={banner.id}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}