import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ContractWorkers.css";

const ContractWorkers = () => {
  const [contractWorkers, setContractWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractWorkers = async () => {
      try {
        const response = await axios.get("/departments/contractworkers/");
        setContractWorkers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load contract workers.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractWorkers();
  }, []);

  if (loading) {
    return <div className="contract-loading">Loading contract workers...</div>;
  }

  if (error) {
    return <div className="contract-error">{error}</div>;
  }

  return (
    <div className="contract-wrapper">
      <div className="contract-card">

        <div className="contract-header">
          <h4>Contract Workers</h4>
          <span>Total: {contractWorkers.length}</span>
        </div>

        <div className="contract-table-wrapper">
          <table className="contract-table">
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
              {contractWorkers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No contract workers found
                  </td>
                </tr>
              ) : (
                contractWorkers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td className="worker-name">{worker.first_name}</td>
                    <td>{worker.last_name}</td>
                    <td className="email">{worker.email}</td>
                    <td>{worker.phone_number}</td>
                    <td>{worker.emergency_contact}</td>
                    <td>{worker.position}</td>
                    <td>{worker.joined}</td>
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

export default ContractWorkers;
