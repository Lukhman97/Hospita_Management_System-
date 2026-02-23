import { useState } from "react";
import Staff from "./Staff";
import Payroll from "./Payroll";
import Department from "./Departments";
import Expenses from "./Expenses";
import Patient from "./PatientData";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("staff");

  const renderContent = () => {
    switch (activeTab) {
      case "staff":
        return <Staff />;
      case "payroll":
        return <Payroll />;
      case "departments":
        return <Department />;
      case "expenses":
        return <Expenses />;
      case "patients":
        return <Patient />;
      default:
        return null;
    }
  };

return (
  <section className="analytics-section">
    <div className="analytics-panel">

      {/* Tabs */}
      <div className="analytics-tabs">
        <button
          className={activeTab === "staff" ? "analytics-tab active" : "analytics-tab"}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </button>

        <button
          className={activeTab === "payroll" ? "analytics-tab active" : "analytics-tab"}
          onClick={() => setActiveTab("payroll")}
        >
          Payroll
        </button>

        <button
          className={activeTab === "departments" ? "analytics-tab active" : "analytics-tab"}
          onClick={() => setActiveTab("departments")}
        >
          Departments
        </button>

        <button
          className={activeTab === "expenses" ? "analytics-tab active" : "analytics-tab"}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </button>

        <button
          className={activeTab === "patients" ? "analytics-tab active" : "analytics-tab"}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>
      </div>

      {/* Content */}
      <div className="analytics-content">
        {renderContent()}
      </div>

    </div>
  </section>
);

};

export default Dashboard;
