import React, { useState } from "react";
import axios from "axios";

function GameForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    year: "",
    console: "",
    genre: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.info(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/games", formData);
      console.info("Nouveau jeu ajouté:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre du jeu:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        image:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Année:
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Console:
        <input
          type="text"
          name="console"
          value={formData.console}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Genre:
        <select name="label" value={formData.label} onChange={handleChange}>
          <option value="Action">Action</option>
          <option value="Fighting">Fighting</option>
          <option value="Sport">Sport</option>
        </select>
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default GameForm;
