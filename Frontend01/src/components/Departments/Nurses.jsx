import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Nurses.css";

const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get("/departments/nurses/");
        setNurses(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Nurses data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  if (loading) {
    return <div className="nurses-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="nurses-error">{error}</div>;
  }

  return (
    <div className="nurses-wrapper">
      <div className="nurses-card">

        <div className="nurses-header">
          <h4>Nurses</h4>
          <span>Total: {nurses.length}</span>
        </div>

        <div className="nurses-table-wrapper">
          <table className="nurses-table">
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
              {nurses.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No records found
                  </td>
                </tr>
              ) : (
                nurses.map((nurse) => (
                  <tr key={nurse.id}>
                    <td>{nurse.id}</td>
                    <td className="person-name">{nurse.first_name}</td>
                    <td>{nurse.last_name}</td>
                    <td className="email">{nurse.email}</td>
                    <td>{nurse.phone_number}</td>
                    <td>{nurse.emergency_contact}</td>
                    <td>{nurse.position}</td>
                    <td>{nurse.joined}</td>
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

export default Nurses;
