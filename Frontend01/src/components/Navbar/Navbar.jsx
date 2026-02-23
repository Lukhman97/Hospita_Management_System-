import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { clearAuthToken, getAuthToken, getUserRole, isAuthenticated } from "../../utils/auth";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const role = getUserRole() || "patient";
  const dashboardPath = ["doctor", "admin"].includes(role)
    ? "/doctor-dashboard"
    : role === "staff"
      ? "/staff-dashboard"
      : "/patient-dashboard";
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const isDoctorLike = ["doctor", "admin"].includes(role);
  const today = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = async () => {
    const token = getAuthToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/api/auth/logout/");
    } catch (err) {
      // 401 means token is already invalid/expired; client should still log out locally.
      if (err?.response?.status !== 401) {
        console.error(err);
      }
    } finally {
      clearAuthToken();
      navigate("/login");
    }
  };

  const handleQuickJump = (event) => {
    const path = event.target.value;
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className={`navbar ${isAuth ? (isDoctorLike ? "navbar-doctor" : "navbar-patient") : "navbar-public"}`}>
      <div className="nav-container">
        <Link className="logo" to="/home">
          {isAuth ? (isDoctorLike ? "Purity Clinical Console" : "Purity Patient Portal") : "Purity Clinic"}
        </Link>

        <div className="nav-links">
          <NavLink to="/home">
            Home
          </NavLink>

          {!isAuth ? (
            <>
              <NavLink to="/" end>
                Portal
              </NavLink>
              <NavLink to="/login">
                Login
              </NavLink>
              <NavLink to="/register">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <div className="nav-utility">
                <span className="nav-chip nav-chip-role">{roleLabel}</span>
                <span className="nav-chip nav-chip-date">{today}</span>
                <select className="quick-jump" onChange={handleQuickJump} value="">
                  <option value="" disabled>
                    Quick Jump
                  </option>
                  <option value={dashboardPath}>Dashboard</option>
                  {["doctor", "admin"].includes(role) ? (
                    <option value="/appointmentsuccess">Appointment Queue</option>
                  ) : role === "staff" ? (
                    <option value="/staff-profile">Staff Profile Form</option>
                  ) : (
                    <>
                      <option value="/patient">Patient Form</option>
                      <option value="/contact">Contact</option>
                    </>
                  )}
                </select>
              </div>

              <NavLink to={dashboardPath}>
                Dashboard
              </NavLink>
              {["doctor", "admin"].includes(role) ? (
                <NavLink to="/appointmentsuccess">
                  Appointment Queue
                </NavLink>
              ) : role === "staff" ? (
                <NavLink to="/staff-profile">
                  Staff Profile
                </NavLink>
              ) : (
                <>
                  <NavLink to="/patient">
                    Patient Form
                  </NavLink>
                  <NavLink to="/contact">
                    Contact
                  </NavLink>
                </>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
