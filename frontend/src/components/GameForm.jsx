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
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    try {
      const myGenres = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/genres`)
        .then((res) => res.data);
      setGenres(myGenres);
    } catch (error) {
      console.error("Erreur ajout genre", error);
    }
  };

  useEffect(() => {
    console.info(formData);
  }, [formData]);

  useEffect(() => {
    getGenres();
  }, []);

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
        <select name="genre_id" onChange={handleChange} required>
          <option value={null}>Choose</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default GameForm;
