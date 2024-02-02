import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Gamespage() {
  return (
    <div>
      <h1 className="titreA">My Own Games Collection</h1>
      <div className="collectionCtn">
        <Link to="/">
          <button type="button" className="buttonManage">
            Home
          </button>
        </Link>
      </div>
      <div className="appCtn">
        <Link to="/admingames">
          <button type="button" className="buttonManages">
            Manage games
          </button>
        </Link>
      </div>
      <Card />
    </div>
  );
}

export default Gamespage;
