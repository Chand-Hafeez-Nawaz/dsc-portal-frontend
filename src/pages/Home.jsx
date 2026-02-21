import React, { useEffect, useState } from "react";
import "./Home.css";
import building from "../assets/dsc-building.jpg";
import collectorImg from "../assets/collector.jpg";
import deoImg from "../assets/deo.jpeg";
import { Link } from "react-router-dom";
import api from "../utils/axiosConfig";

function Home() {
  const [notices, setNotices] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/api/notices");
      setNotices(res.data || []);
    } catch (error) {
      console.error("Notice fetch error", error);
    }
  };

  return (
    <div className="home-wrapper">

      {/* ===== TOP LEADERSHIP STRIP ===== */}
      <section className="top-leadership">
        <div className="official-block" onClick={() =>
    setSelectedOfficial({
      img: collectorImg,
      name: "Sri O. Anand, I.A.S",
      role: "District Collector, Anantapur",
    })
  }
>
  <img src={collectorImg} alt="Collector" />
  <div>
    <h4>Sri O. Anand, I.A.S</h4>
    <p>District Collector, Anantapur</p>
  </div>
</div>

        <div
  className="official-block"
  onClick={() =>
    setSelectedOfficial({
      img: deoImg,
      name: "Sri M. Prasad Babu",
      role: "District Education Officer",
    })
  }
>
  <img src={deoImg} alt="DEO" />
  <div>
    <h4>Sri M. Prasad Babu</h4>
    <p>District Education Officer</p>
  </div>
</div>
      </section>

      {/* ===== HERO SECTION ===== */}
      <section className="hero" data-aos="fade-up">
        <div className="hero-content">
          <h1>District Science Centre</h1>
          <p>Empowering Innovation & Scientific Temper</p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events
            </Link>

            <Link to="/about" className="secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NOTICE BOARD ===== */}
      {notices.length > 0 && (
        <section className="notice-section">
          <h2 className="section-title">Notice Board</h2>

          <div className="notice-grid">
            {(showMore ? notices : notices.slice(0, 3)).map((notice) => (
              <div key={notice._id} className="notice-card">
                <h3>{notice.title}</h3>

               <a
  href={`https://docs.google.com/gview?url=${encodeURIComponent(notice.document)}&embedded=true`}
  target="_blank"
  rel="noopener noreferrer"
  className="download-btn"
>
  Open Circular
</a>
              </div>
            ))}
          </div>

          {notices.length > 3 && (
            <button
              className="gov-btn"
              onClick={() => setShowMore(!showMore)}
              style={{ marginTop: "30px" }}
            >
              {showMore ? "Show Previous" : "Show More"}
            </button>
          )}
        </section>
      )}

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <h2>500+</h2>
            <p>Students Benefited</p>
          </div>
          <div className="stat-box">
            <h2>100+</h2>
            <p>Events Conducted</p>
          </div>
          <div className="stat-box">
            <h2>50+</h2>
            <p>Schools Participated</p>
          </div>
          <div className="stat-box">
            <h2>10+</h2>
            <p>Workshops Organized</p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-preview">
        <div className="about-text-full">
          <h2>About District Science Centre</h2>
          <p>
            District Science Centre, Anantapur nurtures scientific thinking
            through exhibitions, workshops, competitions and innovation-driven
            programs.
          </p>
        </div>
      </section>
      {/* OFFICIAL MODAL */}
{/* OFFICIAL MODAL */}
{selectedOfficial && (
  <div
    className="official-modal-overlay"
    onClick={() => setSelectedOfficial(null)}
  >
    <div
      className="official-modal-card"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="official-modal-image">
        <img src={selectedOfficial.img} alt="Official" />
      </div>

      <div className="official-modal-content">
        <h2>{selectedOfficial.name}</h2>
        <p>{selectedOfficial.role}</p>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Home;