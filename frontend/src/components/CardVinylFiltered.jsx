import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardVinylBase from "./CardVinylBase";
import "./cardVinylBase.css";

function CardVinylFiltered() {
  const alldiscs = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtereddiscs, setFiltereddiscs] = useState([]);

  // Afficher tous les disques lors du premier rendu
  // useEffect(() => {
  //   setFiltereddiscs(alldiscs);
  // }, [alldiscs]);

  // Filtrer les disques en fonction de la recherche
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connexion.get(
          `/discs?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
        setFiltereddiscs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, alldiscs]);

  return (
    <div>
      <div className="searchCtn">
        <input
          className="searchbar"
          type="text"
          placeholder="Rechercher un disc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des discs filtrés */}
      <div className="Ctn">
        {filtereddiscs.map((disc) => (
          <CardVinylBase key={disc.id} disc={disc} />
        ))}
      </div>
    </div>
  );
}

export default CardVinylFiltered;
