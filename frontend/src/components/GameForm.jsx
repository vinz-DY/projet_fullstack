import React, { useState, useEffect } from "react";
import axios from "axios";

function GameForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    year: null,
    console: "",
    genre_id: null,
  });

  useEffect(() => {
    console.info(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games`,
        formData
      );
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
        Image:
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
        <select
          name="genre_id"
          value={formData.genre_id}
          onChange={handleChange}
        >
          <option value="">Choose</option>
          <option value={1}>Action</option>
          <option value={2}>Fighting</option>
          <option value={3}>Sport</option>
        </select>
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default GameForm;
