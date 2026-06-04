"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="gallery reveal show">
      <div className="thumbs">
        {images.map((image, index) => (
          <img
            key={index}
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