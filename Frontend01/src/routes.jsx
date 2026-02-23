import { Navigate, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import RoleSelectPage from "./pages/RoleSelectPage";
import ContactPage from "./pages/ContactPage";
import LoginForm from "./components/Login/LoginForm";
import RegistrationForm from "./components/Registration/RegistrationForm";
import Dashboard from "./components/Dashboard/Dashboard";
import PatientDashboard from "./components/Dashboard/PatientDashboard";
import StaffDashboard from "./components/Staff/StaffDashboard";
import StaffDetailsForm from "./components/Staff/StaffDetailsForm";
import PatientRegForm from "./components/Patient/PatientRegForm";
import PatientSubmitted from "./components/Patient/PatientSubmitted";
import MessageSuccessful from "./components/Appointment/MessageSuccess";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import PublicRoute from "./components/Routing/PublicRoute";
import RoleRoute from "./components/Routing/RoleRoute";
import DashboardRedirect from "./components/Routing/DashboardRedirect";
import PortalSelectionRoute from "./components/Routing/PortalSelectionRoute";
import NotFoundPage from "./pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      
      {/* Public Routes */}
      <Route path="/" element={<RoleSelectPage />} />
      <Route path="/portal" element={<Navigate to="/" replace />} />
      <Route path="/home" element={<Homepage />} />
      <Route
        path="/login"
        element={
          <PortalSelectionRoute>
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          </PortalSelectionRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PortalSelectionRoute>
            <PublicRoute>
              <RegistrationForm />
            </PublicRoute>
          </PortalSelectionRoute>
        }
      />

      {/* Protected Layout Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardRedirect />} />
        <Route
          path="doctor-dashboard"
          element={
            <RoleRoute allowedRoles={["doctor", "admin"]}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="patient-dashboard"
          element={
            <RoleRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="staff-dashboard"
          element={
            <RoleRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="staff-profile"
          element={
            <RoleRoute allowedRoles={["staff"]}>
              <StaffDetailsForm />
            </RoleRoute>
          }
        />
        <Route
          path="patient"
          element={
            <RoleRoute allowedRoles={["patient"]}>
              <PatientRegForm />
            </RoleRoute>
          }
        />
        <Route
          path="success"
          element={
            <RoleRoute allowedRoles={["patient"]}>
              <PatientSubmitted />
            </RoleRoute>
          }
        />
        <Route
          path="appointmentsuccess"
          element={
            <RoleRoute allowedRoles={["doctor", "admin"]}>
              <MessageSuccessful />
            </RoleRoute>
          }
        />
        <Route
          path="contact"
          element={
            <RoleRoute allowedRoles={["patient"]}>
              <ContactPage />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default AppRoutes;
