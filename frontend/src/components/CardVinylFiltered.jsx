import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CardVinylBase from "./CardVinylBase";
import "./cardVinylBase.css";

function CardVinylFiltered() {
  const alldiscs = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les jeux en fonction de la recherche
  const filtereddiscs = alldiscs.filter((disc) =>
    disc.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="searchCtn">
        <input
          className="searchbar"
          type="text"
          placeholder="Rechercher un jeu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des jeux filtrés */}
      <div className="Ctn">
        {filtereddiscs.map((disc) => (
          <CardVinylBase key={disc.id} disc={disc} />
        ))}
      </div>
    </div>
  );
}

export default CardVinylFiltered;
