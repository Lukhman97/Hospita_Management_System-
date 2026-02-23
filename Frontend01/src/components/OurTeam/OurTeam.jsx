import "./TeamPage.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/author.jpg";
import cto from "../../assets/cto.jpg";

const team = [
  {
    name: "Michael Jason",
    role: "Neurosurgeon",
    title: "Chief Surgeon",
    image: img1
  },
  {
    name: "Dr John Doe",
    role: "Surgeon",
    title: "VP Emergency Response",
    image: img2
  },
  {
    name: "Sandra Smith",
    role: "Marketing Executive",
    title: "Chief Marketing Officer",
    image: img3
  },
  {
    name: "Tom Adams",
    role: "Software Engineer",
    title: "Chief Technology Officer",
    image: cto
  }
];

const TeamPage = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Amazing Team</h2>

        <p className="team-subtitle">
          Our professionals are experts in their fields and uphold strong
          clinical and operational standards across every department.
        </p>

        <div className="team-grid">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="team-card"
              style={{ "--delay": `${index * 120}ms` }}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
