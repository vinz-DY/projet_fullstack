import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardDisplay from "./CardDisplay";
import "./cardisplay.css";

function Card() {
  const allGames = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchData = async () => {
    try {
      let response;
      if (selectedLabel) {
        response = await connexion.get(
          `/games?label=${selectedLabel}&searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      } else {
        response = await connexion.get(
          `/games?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      }
      setFilteredGames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGenres = async () => {
    try {
      const myGenres = await connexion.get("/genres").then((res) => res.data);
      setGenres(myGenres);
    } catch (error) {
      console.error("Erreur récupération des genres:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedLabel, allGames]);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div>
      <div className="searchCtn">
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className={selectedLabel ? "dropdownOpen" : "dropdownClosed"}
        >
          <option value="">Select your Game Style</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.label}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>
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
        {filteredGames.map((game) => (
          <CardDisplay key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Card;
