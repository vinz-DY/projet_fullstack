import React from "react";
import { Link } from "react-router-dom";
import LaserdiscForm from "../components/LaserdiscForm";
import "./admin.css";

function AdminLaserdisc() {
  return (
    <div className="AdminCont">
      <h2 className="titleAdmin">Manage your collection</h2>
      <div className="adminbtndiv">
        <Link to="/" className="link">
          <button type="button" className="buttonHome">
            <span>Home</span>
          </button>
        </Link>
        <Link to="/laserdiscs" className="link">
          <button type="button" className="buttonHome">
            <span>Laserdiscs</span>
          </button>
        </Link>
      </div>
      <LaserdiscForm />
    </div>
  );
}

export default AdminLaserdisc;
