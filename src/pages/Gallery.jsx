import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import "./Gallery.css";
import Loader from "../components/Loader";

const images = Object.entries(
  import.meta.glob("../gallery/*.{jpg,jpeg,png}", {
    eager: true,
    import: "default",
  })
);

const normalImages = [];
const newImages = [];

images.forEach(([path, img]) => {
  if (path.toLowerCase().includes("new")) {
    newImages.push(img);
  } else {
    normalImages.push(img);
  }
});

const localImages = [
  normalImages[0],
  ...newImages,
  ...normalImages.slice(1),
];

function Gallery() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  /* ================= FETCH GALLERY ================= */

  const fetchGallery = async () => {
    try {
      const res = await api.get("/api/gallery");
      setUploadedImages(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching gallery", error);
      setLoading(false);
    }
  };

  /* ================= IMAGE ORDER LOGIC ================= */

  const firstThreeLocal = localImages.filter((_, index) =>
    [0, 2, 4].includes(index)
  );

    const firstThreeUploaded = uploadedImages
    .slice(0, 3)
    .map((img) => `${import.meta.env.VITE_API_URL}${img.image}`);

  const remainingLocal = localImages.filter(
    (_, index) => ![0, 2, 4].includes(index)
  );

  const remainingUploaded = uploadedImages
  .slice(3)
  .map((img) => `${import.meta.env.VITE_API_URL}${img.image}`);

  const allImages = [
    ...firstThreeLocal,
    ...firstThreeUploaded,
    ...remainingLocal,
    ...remainingUploaded,
  ];

  /* ================= NAVIGATION ================= */

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="gallery-page">
      <h2 className="gallery-title">
        Science Exhibitions & Events Gallery
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="gallery-grid">
          {allImages.map((img, index) => (
            <div key={index} className="gallery-card">
              <img
                src={img}
                alt="gallery"
                className="gallery-img"
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedIndex !== null && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <span
            className="close-btn"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </span>

          <span
            className="prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ❮
          </span>

          <img
            src={allImages[selectedIndex]}
            alt="Full"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />

          <span
            className="next-btn"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ❯
          </span>
        </div>
      )}
    </div>
  );
}

export default Gallery;