import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload(); // refresh navbar state
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

          {/* NOT LOGGED IN */}
          {!role && (
            <button
              className="login-btn"
              onClick={() => navigate("/admin-login")}
            >
              Login
            </button>
          )}

          {/* ADMIN LOGGED IN */}
          {role === "admin" && (
            <>
              <Link to="/admin-dashboard" className="dashboard-btn">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;