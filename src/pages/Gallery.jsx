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

// Separate new images and normal images
const normalImages = [];
const newImages = [];

images.forEach(([path, img]) => {
  if (path.toLowerCase().includes("new")) {
    newImages.push(img);
  } else {
    normalImages.push(img);
  }
});

// Final order:
// img1 + new images + remaining normal images
const localImages = [
  normalImages[0],     // img1
  ...newImages,        // new1,new2,new3
  ...normalImages.slice(1), // remaining 38 images
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

  const fetchGallery = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/gallery");
      setUploadedImages(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching gallery");
      setLoading(false);
    }
  };

  /* ================= IMAGE ORDER LOGIC ================= */

  // 1️⃣ Pick img1, img3, img5 safely
  const firstThreeLocal = localImages.filter((_, index) =>
    [0, 2, 4].includes(index)
  );

  // 2️⃣ First 3 uploaded images
  const firstThreeUploaded = uploadedImages
    .slice(0, 3)
    .map((img) => `http://localhost:5000/${img.image}`);

  // 3️⃣ Remaining local images
  const remainingLocal = localImages.filter(
    (_, index) => ![0, 2, 4].includes(index)
  );

  // 4️⃣ Remaining uploaded images
  const remainingUploaded = uploadedImages
    .slice(3)
    .map((img) => `http://localhost:5000/${img.image}`);

  const allImages = [
    ...firstThreeLocal,
    ...firstThreeUploaded,
    ...remainingLocal,
    ...remainingUploaded,
  ];

  /* ===================================================== */

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
            <div key={index} className="gallery-card" data-aos="fade-up">
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