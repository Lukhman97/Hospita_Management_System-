import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./ContactPage.css";

const ContactPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_number: "",
    Address: "",
    Message: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { Name, Email, Phone_number, Address, Message } = formData;

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Name || !Email || !Phone_number || !Address || !Message) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/dashboard/message/", formData);
      setError("");
      navigate("/appointmentsuccess");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-wrapper">
      <div className="contact-card">

        <h2 className="contact-title">Contact Us</h2>

        {error && <div className="contact-error">{error}</div>}

        <form onSubmit={handleSubmit} className="contact-form">

          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            value={Name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            value={Email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="Phone_number"
            placeholder="Phone Number"
            value={Phone_number}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={Address}
            onChange={handleChange}
            required
          />

          <textarea
            name="Message"
            rows="4"
            placeholder="Your Message"
            value={Message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default ContactPage;
