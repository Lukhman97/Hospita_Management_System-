import { useNavigate } from "react-router-dom";
import { setPreferredRole } from "../utils/auth";
import "./RoleSelectPage.css";

const RoleSelectPage = () => {
  const navigate = useNavigate();

  const handleContinue = (role) => {
    setPreferredRole(role);
    navigate(`/login?role=${role}`);
  };

  return (
    <section className="role-select">
      <div className="role-select__wrap">
        <p className="role-select__eyebrow">Purity Clinic Portal</p>
        <h1>Select Your Portal</h1>
        <p className="role-select__subtitle">
          Start by choosing how you want to use the system.
        </p>

        <div className="role-select__grid">
          <article className="role-card role-card--doctor">
            <h2>Admin</h2>
            <p>Access full clinic controls, analytics, and cross-team operations.</p>
            <button onClick={() => handleContinue("admin")} className="role-card__btn">
              Continue as Admin
            </button>
          </article>

          <article className="role-card role-card--doctor">
            <h2>Doctor</h2>
            <p>Access admin analytics, staff, departments, payroll, and patients.</p>
            <button onClick={() => handleContinue("doctor")} className="role-card__btn">
              Continue as Doctor
            </button>
          </article>

          <article className="role-card role-card--staff">
            <h2>Staff</h2>
            <p>Submit and manage your staff profile details inside the clinic portal.</p>
            <button onClick={() => handleContinue("staff")} className="role-card__btn">
              Continue as Staff
            </button>
          </article>

          <article className="role-card role-card--patient">
            <h2>Patient</h2>
            <p>Register your details, submit messages, and manage patient-side actions.</p>
            <button onClick={() => handleContinue("patient")} className="role-card__btn">
              Continue as Patient
            </button>
          </article>
        </div>

        <button
          type="button"
          className="role-select__home-link"
          onClick={() => navigate("/home")}
        >
          View Public Homepage
        </button>
      </div>
    </section>
  );
};

export default RoleSelectPage;
