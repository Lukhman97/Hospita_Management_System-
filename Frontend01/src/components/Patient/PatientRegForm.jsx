import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useToast } from "../../hooks/useToast";
import "./PatientRegForm.css";

const PatientRegForm = () => {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_number: "",
    next_of_kin: "",
    phone_number_next_of_kin: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    const errors = {};
    if (formData.first_name.trim().length < 2) errors.first_name = "First name must be at least 2 characters.";
    if (formData.last_name.trim().length < 2) errors.last_name = "Last name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = "Enter a valid email.";
    if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone_number.trim())) errors.phone_number = "Enter a valid phone number.";
    if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone_number_next_of_kin.trim())) {
      errors.phone_number_next_of_kin = "Enter a valid next of kin phone.";
    }
    if (formData.message.trim().length < 10) errors.message = "Reason for visiting must be at least 10 characters.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      pushToast("Please fix validation errors.", "error");
      return;
    }

    try {
      await api.post("/patients/postpatient/", formData);
      pushToast("Patient registration submitted.", "success");
      navigate("/success");
    } catch (err) {
      setError("Failed to register patient. Please try again.");
      pushToast("Failed to register patient.", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="patient-section">
      <div className="patient-container">
        <h3 className="patient-title">
          Patient Registration Portal
        </h3>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-grid">
            <div>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {fieldErrors.first_name && <p className="field-error">{fieldErrors.first_name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              {fieldErrors.last_name && <p className="field-error">{fieldErrors.last_name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              {fieldErrors.phone_number && <p className="field-error">{fieldErrors.phone_number}</p>}
            </div>

            <div>
              <input
                type="text"
                name="next_of_kin"
                placeholder="Next of Kin"
                value={formData.next_of_kin}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone_number_next_of_kin"
                placeholder="Next of Kin Phone"
                value={formData.phone_number_next_of_kin}
                onChange={handleChange}
                required
              />
              {fieldErrors.phone_number_next_of_kin && <p className="field-error">{fieldErrors.phone_number_next_of_kin}</p>}
            </div>
          </div>

          <textarea
            name="message"
            placeholder="Reason For Visiting"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
          {fieldErrors.message && <p className="field-error">{fieldErrors.message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Patient"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PatientRegForm;
