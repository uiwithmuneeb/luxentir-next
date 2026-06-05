export default function ReelsSection() {
  const reels = [
    {
      id: 1,
      title: "Summer Collection",
      video: "https://www.pexels.com/download/video/32415030/",
    },
    {
      id: 2,
      title: "Party Wear",
      video: "https://www.pexels.com/download/video/5561960/",
    },
    {
      id: 3,
      title: "Co-ord Sets",
      video: "https://www.pexels.com/download/video/30927622/",
    },
    {
      id: 4,
      title: "Office Chic",
      video: "https://www.pexels.com/download/video/27247335/",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Watch & Shop</span>
            <h2>Style Reels</h2>
          </div>
          <p>
            Explore Luxentir styling moments through premium 9:16 campaign
            videos.
          </p>
        </div>

        <div className="reels-grid">
          {reels.map((reel) => (
            <div className="reel-card" key={reel.id}>
              <video src={reel.video} muted loop playsInline autoPlay />

              <div className="reel-overlay">{reel.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}