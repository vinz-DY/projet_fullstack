import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import LaserdiscForm from "../components/LaserdiscForm";

function AdminLaserdisc() {
  return (
    <div className="AdminCont">
      <h2 className="titleAdmin">Manage your collection</h2>
      <div className="adminbtndiv">
        <Link to="/">
          <button type="button" className="buttonHome">
            Home
          </button>
        </Link>
        <Link to="/laserdiscs">
          <button type="button" className="buttonHome">
            Laserdiscs
          </button>
        </Link>
      </div>
      <LaserdiscForm />
    </div>
  );
}

export default AdminLaserdisc;
