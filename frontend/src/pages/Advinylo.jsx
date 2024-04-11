import React from "react";
import { Link } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import "./admin.css";

function Advinylo() {
  return (
    <div className="AdminCont">
      <h2 className="titleAdmin">Manage your collection</h2>
      <div className="adminbtndiv">
        <Link to="/" className="link">
          <button type="button" className="buttonHome">
            <span>Home</span>
          </button>
        </Link>
        <Link to="/vinyls" className="link">
          <button type="button" className="buttonHome">
            <span>Vinyls</span>
          </button>
        </Link>
      </div>
      <VinylForm />
    </div>
  );
}

export default Advinylo;
