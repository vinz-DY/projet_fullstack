import React from "react";
import { Link } from "react-router-dom";
import "./cardVinylBase.css";

// la props LD vient de CardLaserdiscFiltered.jsx
function CardLaserdiscBase({ LD }) {
  return (
    <Link to={`/laserdisc/${LD.id}`}>
      <div className="Two">
        <img className="discpics" src={LD.image} alt={LD.originalMovieTitle} />
      </div>
    </Link>
  );
}

export default CardLaserdiscBase;
