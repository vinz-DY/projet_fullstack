import React from "react";
import { Link } from "react-router-dom";
import "./cardVinylBase.css";

// la props DRAMA vient de CardDramaFiltered.jsx
function CardDramaBase({ DRAMA }) {
  return (
    <Link to={`/drama/${DRAMA.id}`}>
      <div className="Two">
        <img className="discpics" src={DRAMA.image} alt={DRAMA.title} />
      </div>
    </Link>
  );
}

export default CardDramaBase;
