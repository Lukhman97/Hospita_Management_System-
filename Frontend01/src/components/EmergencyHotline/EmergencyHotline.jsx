import "./EmergencyHotline.css";

const EmergencyHotline = () => {
  return (
    <section className="hotline-area">
      <div className="hotline-content">
        <p className="hotline-title">Emergency Hotline</p>

        <a className="hotline-number" href="tel:+2347037541482">
          +234 703 754 1482
        </a>

        <p className="hotline-text">
          We provide reliable 24/7 emergency support. Contact our team any
          time for urgent medical assistance.
        </p>

        <a className="hotline-btn" href="tel:+2347037541482">
          Call Now
        </a>
      </div>
    </section>
  );
};

export default EmergencyHotline;
