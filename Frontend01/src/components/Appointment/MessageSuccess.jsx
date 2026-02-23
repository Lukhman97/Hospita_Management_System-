import { Link } from "react-router-dom";
import "./MessageSuccessful.css";

const MessageSuccessful = () => {
  return (
    <section className="success-wrapper">
      <div className="success-card">

        {/* Success Icon */}
        <div className="success-icon">✓</div>

        {/* Message */}
        <h3>Your message was sent successfully!</h3>
        <p>We will get back to you soon.</p>

        {/* Back Button */}
        <Link to="/" className="success-btn">
          Go Back to Homepage
        </Link>

      </div>
    </section>
  );
};

export default MessageSuccessful;
