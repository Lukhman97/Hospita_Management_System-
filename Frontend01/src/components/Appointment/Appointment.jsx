import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ContactPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_number: "",
    Address: "",
    Message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/dashboard/message/", formData);
      console.log(res.data);
      navigate("/appointmentsuccess");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="my-5 p-5 border shadow">
        <form onSubmit={handleSubmit}>
          <h3>Write to us:</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            className="form-control mb-3"
            value={formData.Name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            className="form-control mb-3"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Phone_number"
            placeholder="Phone"
            className="form-control mb-3"
            value={formData.Phone_number}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Address"
            placeholder="Address"
            className="form-control mb-3"
            value={formData.Address}
            onChange={handleChange}
          />

          <textarea
            name="Message"
            placeholder="Message"
            className="form-control mb-3"
            rows="4"
            value={formData.Message}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
