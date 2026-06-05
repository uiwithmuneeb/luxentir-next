"use client";

export default function ProductGallery({
  images,
  name,
  activeImage,
  setActiveImage,
}: {
  images: string[];
  name: string;
  activeImage: string;
  setActiveImage: (image: string) => void;
}) {
  return (
    <div className="gallery reveal show">
      <div className="thumbs">
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className={activeImage === image ? "active" : ""}
            src={image}
            alt={`${name} ${index + 1}`}
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>

      <div className="main-photo">
        <img src={activeImage} alt={name} />
      </div>
    </div>
  );
}