import React from "react";
import { useLoaderData } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import "./cardisplay.css";

function Card() {
  const games = useLoaderData();
  return (
    <div className="Ctn">
      {games.map((game) => (
        <CardDisplay key={game.id} game={game} />
      ))}
    </div>
  );
}

export default Card;
