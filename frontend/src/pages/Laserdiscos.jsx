import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CardLdFilter from "../components/CardLdFilter";

function Laserdiscos() {
  return (
    <div>
      <h1 className="titreA">My Own Laserdiscs Collection</h1>
      <div className="collectionCtn">
        <Link to="/">
          <button type="button" className="buttonManage">
            Home
          </button>
        </Link>
      </div>
      <div className="appCtn">
        <Link to="/adminLaserdiscs">
          <button type="button" className="buttonManages">
            Manage Laserdiscs
          </button>
        </Link>
      </div>
      <CardLdFilter />
    </div>
  );
}

export default Laserdiscos;
