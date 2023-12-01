import React from "react";
import "./cardisplay.css";

function CardDisplay({ game }) {
  return (
    <div>
      <div className="One">
        <img className="gamepics" src={game.image} alt="" />
      </div>
    </div>
  );
}

export default CardDisplay;
