import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CardDramaFiltered from "../components/CardDramasFiltered";

function DramasPage() {
  return (
    <div>
      <h1 className="titreA">My Own Dramas Collection</h1>
      <div className="collectionCtn">
        <Link to="/">
          <button type="button" className="buttonManage">
            Home
          </button>
        </Link>
      </div>
      <div className="appCtn">
        <Link to="/adminDramas">
          <button type="button" className="buttonManages">
            Manage Dramas
          </button>
        </Link>
      </div>
      <CardDramaFiltered />
    </div>
  );
}

export default DramasPage;
