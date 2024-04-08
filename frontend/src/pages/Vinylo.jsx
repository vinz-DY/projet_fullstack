import React from "react";
import { Link } from "react-router-dom";
import CardVinylFiltered from "../components/CardVinylFiltered";
import "../App.css";

function Vinylo() {
  return (
    <div>
      <h1 className="titreA">My Own Vinyls Collection</h1>
      <div className="collectionCtn">
        <Link to="/">
          <button type="button" className="buttonManage">
            Home
          </button>
        </Link>
      </div>
      <div className="appCtn">
        <Link to="/adminVinyls">
          <button type="button" className="buttonManages">
            Manage Vinyls
          </button>
        </Link>
      </div>
      <CardVinylFiltered />
    </div>
  );
}

export default Vinylo;
