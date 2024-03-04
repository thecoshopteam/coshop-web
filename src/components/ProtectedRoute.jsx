import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// Context imports
import { UserAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
