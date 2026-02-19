import React from "react";
import { useNavigate } from "react-router-dom";
import "./Launch.css";

function Launch() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/");
  };

  return (
    <div className="launch-page">
      <div className="launch-card">

        <h1 className="launch-title">
          District Science Centre Portal
        </h1>

        <p className="launch-subtitle">
          Official Launch Ceremony
        </p>

        <div className="launch-divider"></div>

        <p className="launch-description">
          This portal is officially launched by
        </p>

        <h3 className="launch-collector">
          Sri O. Anand, I.A.S
        </h3>

        <p className="launch-role">
          District Collector, Anantapur
        </p>

        <button className="launch-btn" onClick={handleLaunch}>
          🚀 Launch Portal
        </button>

      </div>
    </div>
  );
}

export default Launch;