import "./HomepageTopView.css";

const HomepageTopView = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <p className="hero-tag">Trusted Since 2014</p>
        <h1>Providing the health care you deserve</h1>

        <p className="hero-lead">
          Purity is a private-owned hospital delivering reliable, modern, and
          compassionate health services to families for more than a decade.
        </p>

        <p className="hero-lead">
          Our team is available 24/7 with experienced practitioners,
          state-of-the-art equipment, and a strong commitment to patient safety.
        </p>

        <div className="hero-actions">
          <a className="hero-btn primary" href="/register">
            Get Started
          </a>
          <a className="hero-btn secondary" href="/contact">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomepageTopView;
