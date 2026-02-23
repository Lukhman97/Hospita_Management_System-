import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Expense.css";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("/dashboard/expense/");
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
  return <div className="expense-loading">Loading expenses...</div>;
}

if (error) {
  return <div className="expense-error">{error}</div>;
}


 return (
  <div className="expense-wrapper">
    <div className="expense-card">

      <div className="expense-header">
        <h4>Expense Records</h4>
        <span>Total: {expenses.length}</span>
      </div>

      <div className="expense-table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Requested By</th>
              <th>Position</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Approved</th>
              <th>Approved By</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-row">
                  No expense records available
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="dept-name">{item.Department}</td>
                  <td>{item.Requested_by}</td>
                  <td>{item.Position}</td>
                  <td className="amount">₹ {item.Amount}</td>
                  <td>{item.Reason}</td>
                  <td className={item.Approved ? "approved" : "not-approved"}>
                    {item.Approved ? "Yes" : "No"}
                  </td>
                  <td>{item.Approved_by}</td>
                  <td>{item.Date}</td>
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

export default Expense;
