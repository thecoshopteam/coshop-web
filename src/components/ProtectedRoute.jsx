import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = UserAuth();

  if (!loading) {
    return user ? children : <Navigate to="/login" replace />;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
