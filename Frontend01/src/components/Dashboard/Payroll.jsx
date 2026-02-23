import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Payroll.css";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response = await axios.get("/dashboard/payroll/");
        setPayroll(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load payroll data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  if (loading) {
    return <div className="payroll-loading">Loading payroll...</div>;
  }

  if (error) {
    return <div className="payroll-error">{error}</div>;
  }

  return (
    <div className="payroll-wrapper">
      <div className="payroll-card">

        <div className="payroll-header">
          <h4>Payroll Overview</h4>
          <span>Total: {payroll.length}</span>
        </div>

        <div className="payroll-table-wrapper">
          <table className="payroll-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Position</th>
              </tr>
            </thead>

            <tbody>
              {payroll.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No payroll records found
                  </td>
                </tr>
              ) : (
                payroll.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="employee-name">{item.Name}</td>
                    <td>{item.Department}</td>
                    <td className="salary">₹ {item.Salary}</td>
                    <td>{item.Position}</td>
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

export default Payroll;
