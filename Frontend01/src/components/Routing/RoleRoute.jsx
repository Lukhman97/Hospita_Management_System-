import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../utils/auth";

const RoleRoute = ({ allowedRoles, children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
