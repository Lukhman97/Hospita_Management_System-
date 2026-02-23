import React from "react";
import { Link } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../utils/auth";
import "./Footer.css";

const Footer = () => {
  const role = getUserRole();
  const dashboardPath = isAuthenticated()
    ? ["doctor", "admin"].includes(role)
      ? "/doctor-dashboard"
      : role === "staff"
        ? "/staff-dashboard"
        : "/patient-dashboard"
    : "/home";

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div>
          <h4>Purity Clinic</h4>
          <p>Compassionate and modern healthcare with patient-first service.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p><Link to="/home">Home</Link></p>
          <p><Link to="/">Choose Portal</Link></p>
          <p><Link to={dashboardPath}>Dashboard</Link></p>
          <p><Link to="/contact">Contact</Link></p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: support@purityclinic.com</p>
          <p>Phone: +1 (555) 010-2020</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Purity Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
