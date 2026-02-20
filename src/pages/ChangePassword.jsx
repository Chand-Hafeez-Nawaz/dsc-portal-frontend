import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login again");
      return;
    }

    const res = await axios.put(
      "${import.meta.env.VITE_API_URL}/api/auth/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    alert(error.response?.data?.message || "Password change failed ❌");
  }
};

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <h2>Change Password</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="gov-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;