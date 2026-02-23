import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../utils/auth";

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    const role = getUserRole();
    if (["doctor", "admin"].includes(role)) {
      return <Navigate to="/doctor-dashboard" replace />;
    }
    if (role === "staff") {
      return <Navigate to="/staff-dashboard" replace />;
    }
    return <Navigate to="/patient-dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
