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
    console.log("LOGIN BUTTON CLICKED")

    try {
      const res = await api.post(
        `/api/auth/login`,
        {
          email: email.trim(),     // ✅ important
          password: password.trim()
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      console.log(error.response);
      alert("Login failed - check console");
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