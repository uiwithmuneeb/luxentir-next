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
            <h2>Luxentir Reels</h2>
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
            <div className="reel-card" key={reel.id}>
              <video
                src={reel.videoUrl}
                muted
                loop
                playsInline
                autoPlay
                poster={reel.image || undefined}
              />

              <div className="reel-overlay">{reel.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}