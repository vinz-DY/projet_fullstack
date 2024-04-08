import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardLaserdiscBase from "./CardLaserdiscBase";

import "./cardVinylBase.css";

function CardLdFilter() {
  const allLD = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLD, setFilteredLD] = useState([]);

  // Filtrer les disques en fonction de la recherche
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connexion.get(
          `/laserdiscs?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
        setFilteredLD(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, allLD]);

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

      {/* Liste des LD filtrés */}
      <div className="Ctn">
        {filteredLD.map((LD) => (
          <CardLaserdiscBase key={LD.id} LD={LD} />
        ))}
      </div>
    </div>
  );
}

export default CardLdFilter;
