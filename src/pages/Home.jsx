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

  const firstNotice = notices[0];
  const remainingNotices = notices.slice(1);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="fade-in">District Science Centre</h1>
          <p className="fade-in delay">
            Empowering Innovation & Scientific Temper
          </p>

          <div className="hero-buttons fade-in delay2">
            <Link to="/events" className="primary-btn">
              Explore Events
            </Link>

            <Link to="/about" className="secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 🔥 NOTICE BOARD SECTION */}
      {notices.length > 0 && (
        <section className="notice-section" data-aos="fade-up">
          <h2 className="section-title">Notice Board</h2>

          <div className="notice-card">
            <h3>{firstNotice.title}</h3>
            <a
              href={firstNotice.document}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              Open Circular
            </a>
          </div>

          {showMore &&
            remainingNotices.map((notice) => (
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

          {remainingNotices.length > 0 && (
            <button
              className="gov-btn"
              onClick={() => setShowMore(!showMore)}
              style={{ marginTop: "20px" }}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </section>
      )}

      {/* Leadership Section */}
      <div className="officials-section" data-aos="fade-up">
        <h2 className="section-title">Leadership</h2>

        <div className="officials-grid">
          <div className="official-card">
            <img src={collectorImg} alt="Sri O. Anand IAS" />
            <h3>Sri O. Anand, I.A.S</h3>
            <p>District Collector, Anantapur</p>
          </div>

          <div className="official-card">
            <img src={deoImg} alt="Sri M. Prasad Babu" />
            <h3>Sri M. Prasad Babu</h3>
            <p>District Education Officer</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section" data-aos="fade-up">
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

      {/* About Section */}
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

    </div>
  );
}

export default Home;