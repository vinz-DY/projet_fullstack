import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardLaserdiscBase from "./CardLaserdiscBase";
import "./cardVinylBase.css";

function CardLaserdiscFiltered() {
  const allLaserdiscs = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredlaserdiscs, setFilteredlaserdiscs] = useState([]);

  // Afficher tous les disques lors du premier rendu
  // useEffect(() => {
  //   setFilteredlaserdiscs(alllaserdiscs);
  // }, [alllaserdiscs]);

  // Filtrer les disques en fonction de la recherche
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connexion.get(
          `/laserdiscs?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
        setFilteredlaserdiscs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, allLaserdiscs]);

  return (
    <div>
      <div className="searchCtn">
        <input
          className="searchbar"
          type="text"
          placeholder="Rechercher un laserdisc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des laserdiscs filtrés */}
      <div className="Ctn">
        {filteredlaserdiscs.map((laserdisc) => (
          <CardLaserdiscBase key={laserdisc.id} laserdisc={laserdisc} />
        ))}
      </div>
    </div>
  );
}

export default CardLaserdiscFiltered;
