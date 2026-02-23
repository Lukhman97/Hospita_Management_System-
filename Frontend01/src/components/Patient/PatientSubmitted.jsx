import { Link } from "react-router-dom";
import "./PatientSubmitted.css";

const PatientSubmitted = () => {
  return (
    <section className="success-section">
      <div className="success-container">
        <div className="success-icon">✓</div>

        <h2>Patient Registered Successfully</h2>

        <p>
          Thank you for registering the patient.
          Our team will review the information shortly.
        </p>

        <div className="success-actions">
          <Link to="/patient" className="primary-btn">
            Register Another Patient
          </Link>

          <Link to="/" className="secondary-btn">
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PatientSubmitted;
