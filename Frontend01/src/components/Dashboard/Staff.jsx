import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Staff.css";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("/dashboard/staff/");
        setStaff(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load staff data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return <div className="staff-loading">Loading staff...</div>;
  }

  if (error) {
    return <div className="staff-error">{error}</div>;
  }

  return (
    <div className="staff-wrapper">
      <div className="staff-card">

        <div className="staff-header">
          <h4>Staff Overview</h4>
          <span>Total: {staff.length}</span>
        </div>

        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Reference</th>
                <th>Ref No</th>
                <th>Address</th>
                <th>State</th>
                <th>Age</th>
                <th>Country</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Probation</th>
                <th>Queries</th>
                <th>Department</th>
                <th>Joined</th>
                <th>Resigned</th>
              </tr>
            </thead>

            <tbody>
              {staff.length === 0 ? (
                <tr>
                  <td colSpan="18" className="empty-row">
                    No staff records found
                  </td>
                </tr>
              ) : (
                staff.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="staff-name">{item.First_name}</td>
                    <td>{item.Last_name}</td>
                    <td>{item.Phone_number}</td>
                    <td className="email">{item.email}</td>
                    <td>{item.Reference}</td>
                    <td>{item.Reference_phone_number}</td>
                    <td>{item.Home_address}</td>
                    <td>{item.State}</td>
                    <td>{item.Age}</td>
                    <td>{item.Country}</td>
                    <td>{item.Position}</td>
                    <td className="salary">₹ {item.Salary}</td>
                    <td className={item.On_probation ? "probation" : "confirmed"}>
                      {item.On_probation ? "Yes" : "No"}
                    </td>
                    <td>{item.Number_of_queries}</td>
                    <td>{item.Department}</td>
                    <td>{item.Joined}</td>
                    <td>{item.Resigned || "-"}</td>
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

export default Staff;
