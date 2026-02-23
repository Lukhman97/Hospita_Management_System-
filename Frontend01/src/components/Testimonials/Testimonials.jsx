import { useState, useEffect } from "react";
import "./Testimonials.css";

import img1 from "../../assets/test1.jpg";
import img2 from "../../assets/test2.jpg";
import img3 from "../../assets/test3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Anna Deynah",
    image: img1,
    text: "Purity Hospital has been a revelation for me. I cannot count how many times this team has come to my rescue."
  },
  {
    id: 2,
    name: "Douglas David",
    image: img2,
    text: "Their flexible payment structure and quality service set a standard that is hard to match."
  },
  {
    id: 3,
    name: "Shane Wayne",
    image: img3,
    text: "Simply the best. The staff are hospitable, attentive, and genuinely care about every patient."
  }
];

const TestimonialsMultiPage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const { name, image, text } = testimonials[index];

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2>Testimonials</h2>

        <article className="testimonial-card" key={index}>
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>{text}</p>
        </article>

        <div className="testimonial-dots">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={i === index ? "dot active" : "dot"}
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMultiPage;
