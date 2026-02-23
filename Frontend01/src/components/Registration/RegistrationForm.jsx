import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { getPreferredRole, setPreferredRole } from "../../utils/auth";
import { useToast } from "../../hooks/useToast";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || getPreferredRole() || "patient";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: initialRole,
    acceptedTerms: false
  });

  const { username, email, password, password2, role, acceptedTerms } = formData;

  const validate = () => {
    const errors = {};
    if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (password !== password2) {
      errors.password2 = "Passwords do not match.";
    }
    if (!acceptedTerms) {
      errors.acceptedTerms = "Please accept the terms to continue.";
    }
    return errors;
  };

  const onChange = (e) => {
    setError("");
    setSuccess("");
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    if (e.target.name === "role") {
      setPreferredRole(e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      pushToast("Please fix highlighted fields.", "error");
      return;
    }

    try {
      setLoading(true);
      setFieldErrors({});

      const res = await api.post("/api/auth/register/", {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
        role
      });
      setPreferredRole(role);

      console.log("User Registered:", res.data);
      setSuccess("Registration successful. Redirecting to login...");
      pushToast("Registration successful.", "success");
      setTimeout(() => {
        navigate(`/login?role=${role}`);
      }, 700);

    } catch (err) {
      console.log("Registration Error:", err.response?.data);
      const data = err.response?.data || {};
      const incomingFieldErrors = {};

      if (data.username) incomingFieldErrors.username = data.username[0];
      if (data.email) incomingFieldErrors.email = data.email[0];
      if (data.password) incomingFieldErrors.password = data.password[0];
      if (Object.keys(incomingFieldErrors).length > 0) {
        setFieldErrors(incomingFieldErrors);
      }
      setError(data.detail || data.non_field_errors?.[0] || "Registration failed. Try again.");
      pushToast("Registration failed. Check details and try again.", "error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <form onSubmit={onSubmit}>
          <div className="field-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChange}
              minLength={3}
              autoComplete="username"
              disabled={loading}
              required
            />
            {fieldErrors.username && <p className="field-error">{fieldErrors.username}</p>}
          </div>

          <div className="field-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={onChange}
              autoComplete="email"
              disabled={loading}
              required
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
          </div>

          <div className="field-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              minLength={8}
              autoComplete="new-password"
              disabled={loading}
              required
            />
            {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
          </div>

          <div className="field-group">
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={onChange}
              minLength={8}
              autoComplete="new-password"
              disabled={loading}
              required
            />
            {fieldErrors.password2 && <p className="field-error">{fieldErrors.password2}</p>}
          </div>

          <label className="role-label" htmlFor="role">Register as</label>
          <select id="role" name="role" value={role} onChange={onChange} disabled={loading} required>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <p className="role-help">
            {["doctor", "admin"].includes(role)
              ? "Doctor/Admin accounts can access full dashboards and records."
              : role === "staff"
                ? "Staff accounts can submit profile details and use staff tools."
              : "Patient accounts can access patient dashboard and forms."}
          </p>

          <label className="terms-check">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={acceptedTerms}
              onChange={onChange}
              disabled={loading}
            />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>
          {fieldErrors.acceptedTerms && <p className="field-error">{fieldErrors.acceptedTerms}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to={`/login?role=${role}`}>Login</Link>
        </p>

        <p className="terms">
          Need help? Visit the <Link to="/home">homepage</Link> or contact support.
        </p>
      </div>
    </section>
  );
};

export default RegistrationForm;
