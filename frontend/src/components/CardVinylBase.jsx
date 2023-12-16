import React from "react";
import "./cardVinylBase.css";
import { Link } from "react-router-dom";

function CardVinylBase({ disc }) {
  return (
    <Link to={`/discs/${disc.id}`}>
      <div className="One">
        <img className="discpics" src={disc.image} alt={disc.title} />
      </div>
    </Link>
  );
}

export default CardVinylBase;
