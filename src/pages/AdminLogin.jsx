import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");   // ✅ must be email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL="https://dsc-portal-backend-5eaw.onrender.com";

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("LOGIN BUTTON CLICKED");

  try {
    const response = await api.post("/api/auth/login", {
      email: email.trim(),
      password: password.trim(),
    });

    console.log("RESPONSE:", response);

    // ✅ Store token
    localStorage.setItem("token", response.data.token);

    // ✅ Store role (if exists)
    if (response.data.user && response.data.user.role) {
      localStorage.setItem("role", "admin");
    }

    // ✅ Navigate to dashboard
    navigate("/admin-dashboard");
    window.location.reload();
  } catch (error) {
    console.log("FULL ERROR:", error);
  }
};

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;