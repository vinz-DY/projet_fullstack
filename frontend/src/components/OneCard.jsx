import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./oneCard.css";

function OneCard() {
  const oneCard = useLoaderData();

  return (
    <div className="BigCtn">
      <div className="OneCardCtn">
        <div>
          <img className="OneImg" src={oneCard.image} alt="" />
        </div>
        <div className="content">
          <h3>{oneCard.title}</h3>
          <p>{oneCard.year}</p>
          <p>{oneCard.console}</p>
          <p>{oneCard.label}</p>
          <Link to="/">
            <button className="button" type="button">
              Back in Games
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OneCard;
