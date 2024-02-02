import React from "react";
import { Link } from "react-router-dom";
import VinylForm from "../components/VinylForm";
import "./admin.css";

function Advinylo() {
  return (
    <div className="AdminCont">
      <h2 className="titleAdmin">Manage your collection</h2>
      <div className="adminbtndiv">
        <Link to="/">
          <button type="button" className="buttonHome">
            Home
          </button>
        </Link>
        <Link to="/vinyles">
          <button type="button" className="buttonHome">
            Vinyls
          </button>
        </Link>
      </div>
      <VinylForm />
    </div>
  );
}

export default Advinylo;
