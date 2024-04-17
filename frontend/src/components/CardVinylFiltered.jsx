import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";
import CardVinylBase from "./CardVinylBase";
import "./cardVinylBase.css";

function CardVinylFiltered() {
  const alldiscs = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filtereddiscs, setFiltereddiscs] = useState([]);
  const [musicStyles, setMusicStyles] = useState([]);

  const fetchData = async () => {
    try {
      let response;
      if (selectedLabel) {
        response = await connexion.get(
          `/discs?label=${selectedLabel}&searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      } else {
        response = await connexion.get(
          `/discs?searchTerm=${searchTerm.toLocaleLowerCase()}`
        );
      }
      setFiltereddiscs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMusicStyles = async () => {
    try {
      const myMusicStyle = await connexion
        .get("/musicstyles")
        .then((res) => res.data);
      setMusicStyles(myMusicStyle);
    } catch (error) {
      console.error("Erreur récupération des styles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedLabel, alldiscs]);

  useEffect(() => {
    getMusicStyles();
  }, []);

  return (
    <div>
      <div className="searchCtn">
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className={selectedLabel ? "dropdownOpen" : "dropdownClosed"}
        >
          <option value="">Select your Music Style</option>
          {musicStyles.map((musicStyle) => (
            <option key={musicStyle.id} value={musicStyle.label}>
              {musicStyle.label}
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
