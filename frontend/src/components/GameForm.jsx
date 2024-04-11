import React, { useState, useEffect } from "react";
import connexion from "../services/connexion";
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
  const [searchTerm, setSearchTerm] = useState("");

  const getGenres = async () => {
    try {
      const myGenres = await connexion.get("/genres").then((res) => res.data);
      setGenres(myGenres);
    } catch (error) {
      console.error("Erreur ajout genre", error);
    }
  };

  const getGames = async () => {
    try {
      const myGames = await connexion.get("/games").then((res) => res.data);
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
    if (e.target.name === "genre_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: +e.target.value,
      }));
    } else if (e.target.name === "year") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: +e.target.value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await connexion.post("/games", formData);
      getGames();
      setFormData({
        title: "",
        image: "",
        year: "",
        console: "",
        genre_id: "",
      });
      console.info("Nouveau jeu ajouté:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu:", error);
    }
  };

  const deleteGame = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (confirmDelete) {
      try {
        const response = await connexion.delete(`/games/${id}`);
        getGames();
        console.info("Game deleted:", response.data);
      } catch (error) {
        console.error("Error deleting the game:", error);
      }
    } else {
      console.log("Deletion canceled.");
    }
  };

  const putGame = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/games/${formData.id}`, formData);
      getGames();
      console.info("jeu modifié");
      setFormData({
        title: "",
        image: "",
        year: "",
        console: "",
        genre_id: "",
      });
    } catch (error) {
      console.error("Erreur de la modification du jeu:", error);
    }
  };

  const loadGame = (game) => {
    setFormData(game);
  };

  const handleRequest = (e) => {
    if (formData.id) {
      putGame(e);
    } else {
      handleSubmit(e);
    }
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="searchCtn">
        <div className="search">
          <input
            className="searchbar"
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="FormBigCtn">
        <form onSubmit={handleRequest}>
          <h2 className="AddG">Add your own game</h2>
          <div className="formCtn">
            <div className="inputG">
              <label>
                <p className="formP">Title:</p>
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
                <p className="formP">Release date:</p>
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
                <p className="formP">System:</p>
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
                <p className="formP">Style</p>
                <select
                  name="genre_id"
                  onChange={handleChange}
                  required
                  value={formData.genre_id}
                >
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
              {formData.id ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
        <section className="sectionCtn">
          <h2>Games</h2>
          <table>
            <thead>
              <tr>
                {/* <th>Place</th> */}
                <th>Cover</th>
                <th>Title</th>
                <th>Date</th>
                <th>System</th>
                <th>Style</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game) => {
                return (
                  <tr key={game.id}>
                    {/* <td>{game.id}</td> */}
                    <td>
                      <img
                        className="imgList"
                        src={game.image}
                        alt="cover game"
                      />
                    </td>
                    <td>{game.title}</td>
                    <td>{game.year}</td>
                    <td>{game.console}</td>
                    <td>{game.genre_label}</td>
                    <td className="buttondelput">
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => deleteGame(game.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => loadGame(game)}
                      >
                        Load
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default GameForm;
