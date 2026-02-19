import React from "react";
import { Navigate } from "react-router-dom";

function SchoolRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "school") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default SchoolRoute;