import "./OurServices.css";

const services = [
  {
    title: "Surgery",
    summary:
      "Our seasoned surgeons use modern procedures with a strong focus on safety, precision, and patient recovery.",
    badge: "Critical Care"
  },
  {
    title: "Consultation",
    summary:
      "From in-person reviews to technology-powered follow-up plans, we provide complete guidance for better outcomes.",
    badge: "Specialist Access"
  },
  {
    title: "24/7 Support",
    summary:
      "Our emergency and support teams are available round the clock so patients get immediate and reliable assistance.",
    badge: "Always Available"
  }
];

const OurServices = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>

        <p className="services-subtitle">
          We provide affordable, standardized, and patient-centered services
          designed to give you confidence in every stage of care.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card"
              style={{ "--delay": `${index * 110}ms` }}
            >
              <span className="service-badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <button className="service-btn" type="button">
                Learn More
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
