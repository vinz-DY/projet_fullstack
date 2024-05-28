import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardDramasBase from "./CardDramasBase";
import "./cardVinylBase.css";

function CardDramaFiltered() {
  const allDramas = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filteredDrama, setFilteredDrama] = useState([]);
  const [movieStyles, setMovieStyles] = useState([]);

  // Filtrer les disques en fonction de la recherche
  const fetchData = async () => {
    try {
      let response;
      if (selectedLabel) {
        response = await connexion.get(
          `/dramas?label=${selectedLabel}&searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      } else {
        response = await connexion.get(
          `/dramas?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      }
      setFilteredDrama(response.data);
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
  }, [searchTerm, selectedLabel, allDramas]);

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
          <option value="">Select your Drama Style</option>
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

      {/* Liste des DRAMA filtrés */}
      <div className="Ctn">
        {filteredDrama.map((DRAMA) => (
          <CardDramasBase key={DRAMA.id} DRAMA={DRAMA} />
        ))}
      </div>
    </div>
  );
}

export default CardDramaFiltered;
