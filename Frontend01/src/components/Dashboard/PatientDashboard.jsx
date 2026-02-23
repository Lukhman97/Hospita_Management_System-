import { Link } from "react-router-dom";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  return (
    <section className="patient-dashboard">
      <h2 className="patient-dashboard__title">Patient Dashboard</h2>
      <p className="patient-dashboard__subtitle">
        Welcome. You can register patient details and send contact messages from here.
      </p>

      <div className="patient-dashboard__grid">
        <article className="patient-dashboard__card">
          <h3>Patient Registration</h3>
          <p>Create and submit a patient record.</p>
          <Link to="/patient" className="patient-dashboard__action">
            Open Form
          </Link>
        </article>

        <article className="patient-dashboard__card">
          <h3>Contact Clinic</h3>
          <p>Send a direct message to the clinic team.</p>
          <Link to="/contact" className="patient-dashboard__action">
            Contact Now
          </Link>
        </article>
      </div>
    </section>
  );
};

export default PatientDashboard;
