import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/departments/doctors/");
        setDoctors(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="doctors-loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="doctors-error">{error}</div>;
  }

  return (
    <div className="doctors-wrapper">
      <div className="doctors-card">

        <div className="doctors-header">
          <h4>Doctors</h4>
          <span>Total: {doctors.length}</span>
        </div>

        <div className="doctors-table-wrapper">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Emergency Contact</th>
                <th>Position</th>
                <th>Specialty</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-row">
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td className="doctor-name">{doctor.first_name}</td>
                    <td>{doctor.last_name}</td>
                    <td className="email">{doctor.email}</td>
                    <td>{doctor.phone_number}</td>
                    <td>{doctor.emergency_contact}</td>
                    <td>{doctor.position}</td>
                    <td className="specialty">{doctor.specialty}</td>
                    <td>{doctor.joined}</td>
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

export default Doctors;
