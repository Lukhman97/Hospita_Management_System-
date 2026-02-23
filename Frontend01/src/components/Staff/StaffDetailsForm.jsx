import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StaffDetailsForm.css";

const initialState = {
  First_name: "",
  Last_name: "",
  Phone_number: "",
  email: "",
  Reference: "",
  Reference_phone_number: "",
  Home_address: "",
  State: "",
  Age: "",
  Country: "",
  Position: "",
  Salary: "",
  On_probation: true,
  Number_of_queries: "",
  Department: "",
  Joined: "",
  Resigned: "",
};

const StaffDetailsForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res = await api.get("/dashboard/department/");
        const payload = res?.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        setDepartments(list);
        if (list.length === 0) {
          setError("No departments found. Please ask admin to add departments.");
        }
      } catch {
        setDepartments([]);
        setError("Failed to load departments. Please refresh and try again.");
      } finally {
        setLoadingDepartments(false);
      }
    };

    loadDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.Department) {
      setError("Please select a department.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        Phone_number: Number(formData.Phone_number),
        Reference_phone_number: Number(formData.Reference_phone_number),
        Age: formData.Age ? Number(formData.Age) : null,
        Salary: formData.Salary ? Number(formData.Salary) : null,
        Number_of_queries: formData.Number_of_queries ? Number(formData.Number_of_queries) : null,
        Department: Number(formData.Department),
        Resigned: formData.Resigned || null,
      };

      await api.post("/dashboard/staff/", payload);
      setSuccess("Staff details submitted successfully.");
      setFormData(initialState);
    } catch (err) {
      const data = err.response?.data;
      setError(
        typeof data === "object"
          ? "Please check all required fields and values."
          : "Failed to submit staff details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="staff-form-section">
      <div className="staff-form-card">
        <h2>Staff Details Form</h2>
        {error && <div className="staff-form-error">{error}</div>}
        {success && <div className="staff-form-success">{success}</div>}

        <form className="staff-form" onSubmit={handleSubmit}>
          <input name="First_name" placeholder="First Name" value={formData.First_name} onChange={handleChange} required />
          <input name="Last_name" placeholder="Last Name" value={formData.Last_name} onChange={handleChange} required />
          <input name="Phone_number" type="tel" placeholder="Phone Number" value={formData.Phone_number} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="Reference" placeholder="Reference Name" value={formData.Reference} onChange={handleChange} required />
          <input name="Reference_phone_number" type="tel" placeholder="Reference Phone" value={formData.Reference_phone_number} onChange={handleChange} required />
          <input name="Home_address" placeholder="Home Address" value={formData.Home_address} onChange={handleChange} required />
          <input name="State" placeholder="State" value={formData.State} onChange={handleChange} required />
          <input name="Age" type="number" placeholder="Age" value={formData.Age} onChange={handleChange} />
          <input name="Country" placeholder="Country" value={formData.Country} onChange={handleChange} required />
          <input name="Position" placeholder="Position" value={formData.Position} onChange={handleChange} required />
          <input name="Salary" type="number" placeholder="Salary" value={formData.Salary} onChange={handleChange} />
          <input name="Number_of_queries" type="number" placeholder="Number of Queries" value={formData.Number_of_queries} onChange={handleChange} />
          <input name="Joined" type="date" value={formData.Joined} onChange={handleChange} required />
          <input name="Resigned" type="date" value={formData.Resigned} onChange={handleChange} />

          <select
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            required
            disabled={loadingDepartments || departments.length === 0}
          >
            <option value="">
              {loadingDepartments ? "Loading departments..." : "Select Department"}
            </option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.Name}
              </option>
            ))}
          </select>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="On_probation"
              checked={formData.On_probation}
              onChange={handleChange}
            />
            On Probation
          </label>

          <button disabled={loading || loadingDepartments || departments.length === 0} type="submit">
            {loading ? "Submitting..." : "Submit Staff Details"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default StaffDetailsForm;
