import { Outlet, NavLink } from "react-router-dom";
import { getUserRole } from "../../utils/auth";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const role = getUserRole() || "patient";
  const isDoctorLike = ["doctor", "admin"].includes(role);
  const isStaff = role === "staff";
  const dashboardThemeClass = isDoctorLike
    ? "dashboard-doctor"
    : isStaff
      ? "dashboard-staff"
      : "dashboard-patient";

  const dashboardPath = isDoctorLike
    ? "/doctor-dashboard"
    : isStaff
      ? "/staff-dashboard"
      : "/patient-dashboard";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`dashboard-container ${dashboardThemeClass}`}>
      <aside className="sidebar">
        <h2 className="sidebar-title">
          {role === "admin" ? "Admin Panel" : isDoctorLike ? "Doctor Panel" : isStaff ? "Staff Panel" : "Patient Panel"}
        </h2>
        <p className="sidebar-subtitle">{today}</p>

        <nav className="sidebar-nav">
          <NavLink to={dashboardPath} className="nav-link">
            {isDoctorLike ? "Operations Dashboard" : isStaff ? "Staff Dashboard" : "My Dashboard"}
          </NavLink>

          {isDoctorLike ? (
            <NavLink to="/appointmentsuccess" className="nav-link">
              Appointment Queue
            </NavLink>
          ) : isStaff ? (
            <NavLink to="/staff-profile" className="nav-link">
              Staff Profile Form
            </NavLink>
          ) : (
            <>
              <NavLink to="/patient" className="nav-link">
                My Registration
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Support Contact
              </NavLink>
            </>
          )}

          {isDoctorLike && (
            <NavLink to="/doctor-dashboard" className="nav-link">
              Patient Records
            </NavLink>
          )}
        </nav>

        <div className="sidebar-section">
          <h3>{isDoctorLike ? "Doctor Actions" : isStaff ? "Staff Actions" : "Patient Actions"}</h3>
          <div className="quick-actions">
            <NavLink to={dashboardPath} className="quick-action-btn">
              {isDoctorLike ? "View Analytics" : isStaff ? "View Staff Hub" : "View Summary"}
            </NavLink>
            {isDoctorLike ? (
              <>
                <NavLink to="/doctor-dashboard" className="quick-action-btn">Review Patients</NavLink>
                <NavLink to="/appointmentsuccess" className="quick-action-btn">Appointment Queue</NavLink>
              </>
            ) : isStaff ? (
              <>
                <NavLink to="/staff-profile" className="quick-action-btn">Submit Profile</NavLink>
                <NavLink to="/contact" className="quick-action-btn">Ask Operations</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/patient" className="quick-action-btn">Submit Form</NavLink>
                <NavLink to="/contact" className="quick-action-btn">Ask for Help</NavLink>
              </>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>{isDoctorLike ? "Operations Status" : isStaff ? "Staff Status" : "Account Status"}</h3>
          <div className="workspace-card">
            <p><strong>Role:</strong> {roleLabel}</p>
            <p><strong>Access:</strong> {isDoctorLike ? "Full Clinical Records" : isStaff ? "Staff Profile Tools" : "Patient Tools Only"}</p>
            <p><strong>Mode:</strong> {isDoctorLike ? "Clinical Workflow" : isStaff ? "Operational Workflow" : "Self-Service"}</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
