import React from "react";
import "./cardisplay.css";

function CardDisplay({ game }) {
  return (
    <div>
      <div className="One">
        <img className="gamepics" src={game.image} alt="" />
        <h3>{game.title}</h3>
      </div>
    </div>
  );
}

export default CardDisplay;
