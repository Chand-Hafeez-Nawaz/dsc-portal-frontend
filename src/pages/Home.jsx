import React from "react";
import "./Home.css";
import building from "../assets/dsc-building.jpg";
import collectorImg from "../assets/collector.jpg";
import deoImg from "../assets/deo.jpeg";
import { Link } from "react-router-dom";

function Home() {
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

      {/* STATS SECTION */}
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

      {/* ABOUT PREVIEW */}
    <section className="about-preview">
     <div className="about-text-full">
        <h2>About District Science Centre</h2>
          <p>
            District Science Centre, Anantapur nurtures scientific thinking
            through exhibitions, workshops, competitions and innovation-driven
            programs. It serves as a hub for experiential learning and
            promotes scientific awareness among students and educators.
          </p>
     </div>
    </section>

    </div>
  );
}

export default Home;