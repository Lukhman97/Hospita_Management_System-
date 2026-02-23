import { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import { useToast } from "../../hooks/useToast";
import "./Patient.css";

const PAGE_SIZE = 8;

const formatDateTime = (value) => {
  if (!value) {
    return "Not yet";
  }
  return new Date(value).toLocaleString();
};

const Patient = () => {
  const { pushToast } = useToast();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/patients/getpatient/");
        setPatients(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load patients.");
        pushToast("Failed to load patients.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [pushToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  const updateStatus = async (id, status, extra = {}) => {
    try {
      setProcessingId(id);
      const response = await axios.patch(`/patients/getpatient/${id}/`, { status, ...extra });
      setPatients((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      pushToast(`Patient #${id} updated to ${status.replace("_", " ")}.`, "success");
    } catch (err) {
      console.error(err);
      setError("Failed to update patient status.");
      pushToast("Failed to update patient status.", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const pendingCount = patients.filter((p) => p.status === "pending").length;
  const treatmentCount = patients.filter((p) => p.status === "in_treatment").length;
  const treatedCount = patients.filter((p) => p.status === "treated").length;

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = patients.filter((patient) => {
      const statusMatch = statusFilter === "all" || patient.status === statusFilter;
      const searchMatch =
        query.length === 0 ||
        `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(query) ||
        String(patient.id).includes(query) ||
        (patient.email || "").toLowerCase().includes(query) ||
        (patient.phone_number || "").toLowerCase().includes(query);

      return statusMatch && searchMatch;
    });

    const sorted = [...result];
    if (sortBy === "latest") {
      sorted.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (sortBy === "name_asc") {
      sorted.sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
    } else if (sortBy === "name_desc") {
      sorted.sort((a, b) => `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`));
    }

    return sorted;
  }, [patients, searchTerm, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetControls = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("latest");
  };

  if (loading) {
  return <div className="patient-loading">Loading patients...</div>;
}

if (error) {
  return <div className="patient-error">{error}</div>;
}

return (
  <div className="patient-wrapper">
    <div className="patient-card">

      <div className="patient-header">
        <h4>Patient Records</h4>
        <span>Total: {patients.length}</span>
      </div>
      <div className="patient-meta">
        <span className="pill pending">Pending: {pendingCount}</span>
        <span className="pill treatment">In Treatment: {treatmentCount}</span>
        <span className="pill accepted">Treated: {treatedCount}</span>
      </div>

      <div className="patient-controls">
        <input
          className="patient-control-input"
          type="text"
          placeholder="Search by ID, name, email, phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select className="patient-control-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in_treatment">In Treatment</option>
          <option value="treated">Treated</option>
          <option value="rejected">Rejected</option>
        </select>

        <select className="patient-control-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
        </select>

        <button type="button" className="clear-controls-btn" onClick={resetControls}>
          Reset
        </button>
      </div>

      <div className="patient-table-wrapper">
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Next Of Kin</th>
              <th>Kin Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Timeline</th>
              <th>Treatment Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPatients.length === 0 ? (
              <tr>
                <td colSpan="13" className="empty-row">
                  No patients found
                </td>
              </tr>
            ) : (
              paginatedPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td className="patient-name">
                    {patient.first_name}
                  </td>
                  <td>{patient.last_name}</td>
                  <td>{patient.address}</td>
                  <td className="email">{patient.email}</td>
                  <td>{patient.phone_number}</td>
                  <td>{patient.next_of_kin}</td>
                  <td>{patient.phone_number_next_of_kin}</td>
                  <td>{patient.message}</td>
                  <td>
                    <span className={`status-badge ${patient.status || "pending"}`}>
                      {patient.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <ul className="timeline-list">
                      <li>
                        <strong>Reviewed:</strong> {formatDateTime(patient.reviewed_at)}
                        <br />
                        <span>By: {patient.reviewed_by_username || "N/A"}</span>
                      </li>
                      <li>
                        <strong>Treated:</strong> {formatDateTime(patient.treated_at)}
                        <br />
                        <span>By: {patient.treated_by_username || "N/A"}</span>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <textarea
                      className="note-input"
                      rows="2"
                      placeholder="Treatment notes..."
                      value={noteDrafts[patient.id] ?? patient.treatment_notes ?? ""}
                      onChange={(e) =>
                        setNoteDrafts((prev) => ({ ...prev, [patient.id]: e.target.value }))
                      }
                    />
                  </td>
                  <td>
                    {patient.status === "pending" && (
                      <button
                        className="action-btn approve"
                        disabled={processingId === patient.id}
                        onClick={() => updateStatus(patient.id, "accepted")}
                      >
                        {processingId === patient.id ? "Saving..." : "Accept"}
                      </button>
                    )}

                    {patient.status === "accepted" && (
                      <button
                        className="action-btn treatment"
                        disabled={processingId === patient.id}
                        onClick={() =>
                          updateStatus(patient.id, "in_treatment", {
                            treatment_notes: noteDrafts[patient.id] ?? patient.treatment_notes ?? "",
                          })
                        }
                      >
                        {processingId === patient.id ? "Saving..." : "Start Treatment"}
                      </button>
                    )}

                    {patient.status === "in_treatment" && (
                      <button
                        className="action-btn treated"
                        disabled={processingId === patient.id}
                        onClick={() =>
                          updateStatus(patient.id, "treated", {
                            treatment_notes: noteDrafts[patient.id] ?? patient.treatment_notes ?? "",
                          })
                        }
                      >
                        {processingId === patient.id ? "Saving..." : "Mark Treated"}
                      </button>
                    )}

                    {patient.status !== "rejected" && patient.status !== "treated" && (
                      <button
                        className="action-btn reject"
                        disabled={processingId === patient.id}
                        onClick={() => updateStatus(patient.id, "rejected")}
                      >
                        {processingId === patient.id ? "Saving..." : "Reject"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="patient-pagination">
        <p>
          Showing {paginatedPatients.length} of {filteredPatients.length} matching records
        </p>
        <div className="patient-pagination-actions">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  </div>
);

};

export default Patient;
