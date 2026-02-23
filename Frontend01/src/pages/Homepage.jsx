import React, { useEffect, useMemo } from "react";
import "./HomePage.css";
import HomepageTopView from "../components/HomepageTopView/HomepageTopview";
import OurServices from "../components/OurServices/OurServices";
import TeamPage from "../components/OurTeam/OurTeam";
import EmergencyHotline from "../components/EmergencyHotline/EmergencyHotline";
import TestimonialsMultiPage from "../components/Testimonials/Testimonials";

export default function Homepage() {
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: `${(i * 11.7) % 100}%`,
        delay: `${(i % 12) * 0.35}s`,
        duration: `${0.9 + (i % 7) * 0.18}s`,
        opacity: 0.18 + (i % 5) * 0.08,
        height: `${12 + (i % 6) * 5}px`,
      })),
    []
  );

  useEffect(() => {
    const sections = document.querySelectorAll(".homepage section");
    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage">
      <div className="rain-layer" aria-hidden="true">
        {rainDrops.map((drop) => (
          <span
            key={drop.id}
            className="rain-drop"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              opacity: drop.opacity,
              height: drop.height,
            }}
          />
        ))}
      </div>

      <HomepageTopView />
      <OurServices />
      <TeamPage />
      <EmergencyHotline />
      <TestimonialsMultiPage />
    </div>
  );
}
