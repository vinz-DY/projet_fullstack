import React, { useState } from "react";
import axios from "axios";

function GameForm() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/games", formData);
      console.info("Nouveau jeu ajouté:", response.data);
      // Ajoutez ici la logique de redirection ou de mise à jour de l'interface utilisateur
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default GameForm;
