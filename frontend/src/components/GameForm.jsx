import React, { useState, useEffect } from "react";
import axios from "axios";
import "./gameForm.css";

function GameForm() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    year: null,
    console: "",
    genre_id: null,
  });
  const [genres, setGenres] = useState([]);
  const [games, setGames] = useState([]);

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

  const getGames = async () => {
    try {
      const myGames = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/games`)
        .then((res) => res.data);
      setGames(myGames);
    } catch (error) {
      console.error("Erreur get games", error);
    }
  };

  useEffect(() => {
    console.info(formData);
  }, [formData]);

  useEffect(() => {
    getGenres();
    getGames();
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
    <div className="FormBigCtn">
      <form onSubmit={handleSubmit}>
        <h2 className="AddG">Add your own game</h2>
        <div className="formCtn">
          <div className="inputG">
            <label>
              <p className="formP">Titre:</p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="inputG">
            <label>
              <p className="formP">Image:</p>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="inputG">
            <label>
              <p className="formP">Date de sortie:</p>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="inputG">
            <label>
              <p className="formP">Console:</p>
              <input
                type="text"
                name="console"
                value={formData.console}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="formP">Genre</p>
              <select name="genre_id" onChange={handleChange} required>
                <option value={null}>choisi ton style</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className="buttonA" type="submit">
            Ajouter
          </button>
        </div>
      </form>
      <section className="sectionCtn">
        <h2>Games</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Titre</th>
              <th>Image</th>
              <th>Date</th>
              <th>Console</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              return (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.title}</td>
                  <td>{game.image}</td>
                  <td>{game.year}</td>
                  <td>{game.console}</td>
                  <td>{game.genre_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default GameForm;
