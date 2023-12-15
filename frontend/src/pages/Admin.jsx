import React from "react";
import { Link } from "react-router-dom";
import GameForm from "../components/GameForm";
import "./admin.css";

function Admin() {
  return (
    <div className="AdminCont">
      <h2 className="titleAdmin">Manage your collection</h2>
      <Link to="/">
        <button type="button" className="buttonHome">
          Home
        </button>
      </Link>
      <GameForm />
    </div>
  );
}

export default Admin;
