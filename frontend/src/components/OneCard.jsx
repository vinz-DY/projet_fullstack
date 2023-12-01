import React from "react";
import { useLoaderData } from "react-router-dom";

function OneCard() {
  const oneCard = useLoaderData();

  return (
    <div className="OneCardCtn">
      <div>
        <img src={oneCard.image} alt="" />
      </div>
      <div>
        <h3>{oneCard.title}</h3>
        <p>{oneCard.year}</p>
        <p>{oneCard.console}</p>
        <p>{oneCard.label}</p>
      </div>
    </div>
  );
}

export default OneCard;
