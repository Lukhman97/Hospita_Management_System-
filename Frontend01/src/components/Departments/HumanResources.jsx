import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./HumanResource.css";

const HumanResource = () => {
  const [humanresource, setHumanResource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumanResource = async () => {
      try {
        const response = await axios.get("/departments/humanresource/");
        setHumanResource(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Human Resource data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHumanResource();
  }, []);

  if (loading) {
    return <div className="hr-loading">Loading data...</div>;
  }

  if (error) {
    return <div className="hr-error">{error}</div>;
  }

  return (
    <div className="hr-wrapper">
      <div className="hr-card">

        <div className="hr-header">
          <h4>Human Resource</h4>
          <span>Total: {humanresource.length}</span>
        </div>

        <div className="hr-table-wrapper">
          <table className="hr-table">
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
              {humanresource.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No records found
                  </td>
                </tr>
              ) : (
                humanresource.map((person) => (
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

export default HumanResource;
