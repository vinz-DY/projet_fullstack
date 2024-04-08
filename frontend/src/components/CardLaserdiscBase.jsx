import React from "react";
import "./cardVinylBase.css";
import { Link } from "react-router-dom";

// la props laserdisc vient de CardLaserdiscFiltered.jsx
function CardLaserdiscBase({ laserdisc }) {
  return (
    <Link to={`/laserdisc/${laserdisc.id}`}>
      <div className="One">
        <img
          className="laserdiscpics"
          src={laserdisc.image}
          alt={laserdisc.originalMovieTitle}
        />
      </div>
    </Link>
  );
}

export default CardLaserdiscBase;
