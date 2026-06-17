type Reel = {
  id: number;
  title: string;
  videoUrl: string;
  image?: string | null;
};

export default function ReelsSection({
  reels = [],
}: {
  reels?: Reel[];
}) {
  if (!reels.length) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Follow @Luxentir</span>
            <h2>Instagram Reels</h2>
          </div>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="btn ghost"
          >
            Visit Instagram
          </a>
        </div>

        <div className="reels-grid">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-card"
            >
              {reel.image ? (
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="reel-thumb"
                />
              ) : (
                <div className="reel-placeholder">
                  🎬
                </div>
              )}

              <div className="reel-overlay">
                {reel.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}