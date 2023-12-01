import React from "react";
import "./cardisplay.css";
import { Link } from "react-router-dom";

function CardDisplay({ game }) {
  return (
    <Link to={`/games/${game.id}`}>
      <div className="One">
        <img className="gamepics" src={game.image} alt={game.title} />
      </div>
    </Link>
  );
}

export default CardDisplay;
