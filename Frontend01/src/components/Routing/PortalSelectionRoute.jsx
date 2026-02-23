import { Navigate } from "react-router-dom";
import { getPreferredRole } from "../../utils/auth";

const PortalSelectionRoute = ({ children }) => {
  const role = getPreferredRole();
  const isValid = role === "doctor" || role === "patient" || role === "staff" || role === "admin";

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PortalSelectionRoute;
