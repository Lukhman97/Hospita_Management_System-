import { Navigate } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const DashboardRedirect = () => {
  const role = getUserRole();
  if (["doctor", "admin"].includes(role)) {
    return <Navigate to="/doctor-dashboard" replace />;
  }
  if (role === "staff") {
    return <Navigate to="/staff-dashboard" replace />;
  }
  return <Navigate to="/patient-dashboard" replace />;
};

export default DashboardRedirect;
