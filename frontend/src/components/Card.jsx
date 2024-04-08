import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardDisplay from "./CardDisplay";
import "./cardisplay.css";

function Card() {
  const allGames = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  // Filtrer les jeux en fonction de la recherche
  // const filteredGames = allGames.filter((game) =>
  //   game.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connexion.get(
          `/games?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
        setFilteredGames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, allGames]);

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
        {filteredGames.map((game) => (
          <CardDisplay key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Card;
