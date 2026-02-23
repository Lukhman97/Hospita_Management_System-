import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Department.css";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/dashboard/department/");
        const payload = response?.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];
        setDepartments(list);
      } catch {
        setError("Failed to load departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <h5 className="text-center mt-4">Loading departments...</h5>;
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="department-wrapper">
      <div className="department-card">
        <div className="department-header">
          <h4>Department Overview</h4>
          <span>Total: {departments.length}</span>
        </div>

        <div className="table-responsive">
          <table className="table department-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Staff</th>
                <th>Head</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Duration</th>
                <th>Function</th>
              </tr>
            </thead>

            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No department data available
                  </td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr key={dept.id}>
                    <td>{dept.id}</td>
                    <td className="fw-semibold">{dept.Name}</td>
                    <td>{dept.Staff_strength}</td>
                    <td>{dept.Head_of_department}</td>
                    <td className="text-success">INR {dept.Income_generated}</td>
                    <td className="text-danger">INR {dept.Expenses}</td>
                    <td>{dept.Duration}</td>
                    <td>{dept.Function}</td>
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

export default Department;
