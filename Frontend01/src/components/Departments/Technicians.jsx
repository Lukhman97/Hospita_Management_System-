import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Technicians.css";

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("/departments/technicians/");
        setTechnicians(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Technicians data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) {
    return <div className="tech-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="tech-error">{error}</div>;
  }

  return (
    <div className="tech-wrapper">
      <div className="tech-card">

        <div className="tech-header">
          <h4>Technicians</h4>
          <span>Total: {technicians.length}</span>
        </div>

        <div className="tech-table-wrapper">
          <table className="tech-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Emergency Contact</th>
                <th>Position</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {technicians.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No records found
                  </td>
                </tr>
              ) : (
                technicians.map((technician) => (
                  <tr key={technician.id}>
                    <td>{technician.id}</td>
                    <td className="person-name">
                      {technician.first_name}
                    </td>
                    <td>{technician.last_name}</td>
                    <td className="email">{technician.email}</td>
                    <td>{technician.phone_number}</td>
                    <td>{technician.emergency_contact}</td>
                    <td>{technician.position}</td>
                    <td>{technician.joined}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Technicians;
