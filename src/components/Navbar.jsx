import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React from "react";

function Navbar() {
  const navigate = useNavigate();

  // 🔥 Use token instead of role
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload(); // safe for demo
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <Link to="/" className="logo-link">
            District Science Centre, Anantapur
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {token ? (
            <>
              <Link to="/admin-dashboard" className="dashboard-btn">
                Dashboard
              </Link>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/admin-login")}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;