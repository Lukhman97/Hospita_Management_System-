import { Link } from "react-router-dom";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  return (
    <section className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      <p>Manage your staff profile details and collaborate with clinic operations.</p>

      <div className="staff-dashboard-grid">
        <article className="staff-dashboard-card">
          <h3>Submit Staff Details</h3>
          <p>Register your personal and professional details for clinic records.</p>
          <Link to="/staff-profile" className="staff-action-link">
            Open Staff Form
          </Link>
        </article>

        <article className="staff-dashboard-card">
          <h3>Need Help?</h3>
          <p>Contact the clinic operations team for support and updates.</p>
          <Link to="/contact" className="staff-action-link">
            Contact Team
          </Link>
        </article>
      </div>
    </section>
  );
};

export default StaffDashboard;
