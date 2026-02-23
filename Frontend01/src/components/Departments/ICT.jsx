import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ICT.css";

const ICT = () => {
  const [ict, setIct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchICT = async () => {
      try {
        const response = await axios.get("/departments/ict/");
        setIct(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load ICT data.");
      } finally {
        setLoading(false);
      }
    };

    fetchICT();
  }, []);

  if (loading) {
    return <div className="ict-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="ict-error">{error}</div>;
  }

  return (
    <div className="ict-wrapper">
      <div className="ict-card">

        <div className="ict-header">
          <h4>ICT Department</h4>
          <span>Total: {ict.length}</span>
        </div>

        <div className="ict-table-wrapper">
          <table className="ict-table">
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
              {ict.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No records found
                  </td>
                </tr>
              ) : (
                ict.map((person) => (
                  <tr key={person.id}>
                    <td>{person.id}</td>
                    <td className="person-name">{person.first_name}</td>
                    <td>{person.last_name}</td>
                    <td className="email">{person.email}</td>
                    <td>{person.phone_number}</td>
                    <td>{person.emergency_contact}</td>
                    <td>{person.position}</td>
                    <td>{person.joined}</td>
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

export default ICT;
