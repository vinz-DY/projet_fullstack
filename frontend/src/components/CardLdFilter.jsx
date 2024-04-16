import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardLaserdiscBase from "./CardLaserdiscBase";
import "./cardVinylBase.css";

function CardLdFilter() {
  const allLD = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filteredLD, setFilteredLD] = useState([]);
  const [movieStyles, setMovieStyles] = useState([]);

  // Filtrer les disques en fonction de la recherche
  const fetchData = async () => {
    try {
      let response;
      if (selectedLabel) {
        response = await connexion.get(
          `/laserdiscs?label=${selectedLabel}&searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      } else {
        response = await connexion.get(
          `/laserdiscs?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      }
      setFilteredLD(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieStyles = async () => {
    try {
      const myMovieStyle = await connexion
        .get("/moviestyles")
        .then((res) => res.data);
      setMovieStyles(myMovieStyle);
    } catch (error) {
      console.error("Erreur récupération des styles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedLabel, allLD]);

  useEffect(() => {
    getMovieStyles();
  }, []);

  return (
    <div>
      <div className="searchCtn">
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className={selectedLabel ? "dropdownOpen" : "dropdownClosed"}
        >
          <option value="">Select your Movie Style</option>
          {movieStyles.map((movieStyle) => (
            <option key={movieStyle.id} value={movieStyle.label}>
              {movieStyle.label}
            </option>
          ))}
        </select>
      </div>
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
