import { useState } from "react";
import Doctors from "./Doctors";
import Nurses from "./Nurses";
import HumanResources from "./HumanResources";
import ICT from "./ICT";
import Technicians from "./Technicians";
import ContractWorkers from "./ContractWorkers";
import "./Departments.css";

const Departments = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Doctors />;
      case 1:
        return <Nurses />;
      case 2:
        return <HumanResources />;
      case 3:
        return <Technicians />;
      case 4:
        return <ICT />;
      case 5:
        return <ContractWorkers />;
      default:
        return null;
    }
  };

  return (
    <div className="departments-wrapper">

      {/* Tabs */}
      <div className="departments-tabs">
        <button
          className={activeTab === 0 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(0)}
        >
          Doctors
        </button>

        <button
          className={activeTab === 1 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(1)}
        >
          Nurses
        </button>

        <button
          className={activeTab === 2 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(2)}
        >
          Human Resource
        </button>

        <button
          className={activeTab === 3 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(3)}
        >
          Technicians
        </button>

        <button
          className={activeTab === 4 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(4)}
        >
          ICT
        </button>

        <button
          className={activeTab === 5 ? "dept-tab active" : "dept-tab"}
          onClick={() => setActiveTab(5)}
        >
          Contract Workers
        </button>
      </div>

      {/* Content */}
      <div className="departments-content">
        {renderContent()}
      </div>

    </div>
  );
};

export default Departments;
