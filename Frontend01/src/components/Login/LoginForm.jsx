import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import {
  clearAuthToken,
  getPreferredRole,
  normalizeRole,
  setAuthToken,
  setPreferredRole,
  setUserRole,
} from "../../utils/auth";
import { useToast } from "../../hooks/useToast";
import "./LoginForm.css";

const Login = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || getPreferredRole() || "";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setError("");
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters.";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    return errors;
  };

  const showLoginError = (message) => {
    setError(message);
    pushToast(message, "error");
    window.alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      showLoginError("Please select your portal first.");
      navigate("/");
      return;
    }

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      pushToast("Please fix validation errors before login.", "error");
      return;
    }

    try {
      setLoading(true);
      setFieldErrors({});

      const res = await api.post("/api/auth/login/", {
        ...formData,
        role: selectedRole,
      });

      const resolvedRole = normalizeRole(res.data?.user?.role || selectedRole);
      const expectedRole = normalizeRole(selectedRole);

      if (resolvedRole !== expectedRole) {
        clearAuthToken();
        const portalName = expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1);
        const accountPortalName = resolvedRole.charAt(0).toUpperCase() + resolvedRole.slice(1);
        showLoginError(
          `This account belongs to ${accountPortalName} portal. Please login from ${portalName} portal.`
        );
        return;
      }

      setAuthToken(res.data.token);
      setUserRole(resolvedRole);
      setPreferredRole(resolvedRole);
      pushToast("Login successful.", "success");

      if (["doctor", "admin"].includes(resolvedRole)) {
        navigate("/doctor-dashboard");
      } else if (resolvedRole === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      clearAuthToken();
      const data = err.response?.data;
      let message = "Invalid username or password.";

      if (typeof data === "string") {
        message = data;
      } else if (Array.isArray(data?.non_field_errors) && data.non_field_errors.length) {
        message = data.non_field_errors[0];
      } else if (Array.isArray(data?.detail) && data.detail.length) {
        message = data.detail[0];
      } else if (typeof data?.detail === "string") {
        message = data.detail;
      }

      showLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Sign in to continue to your {selectedRole || "selected"} dashboard.
        </p>

        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {fieldErrors.username && <p className="field-error">{fieldErrors.username}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-link">
          Don't have an account? <Link to={`/register?role=${selectedRole || "patient"}`}>Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
