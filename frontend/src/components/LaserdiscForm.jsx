import React, { useState, useEffect, useRef } from "react";
import connexion from "../services/connexion";
import addSound from "../assets/add.mp3";
import errorSound from "../assets/error.mp3";
import cancelSound from "../assets/canceled.mp3";
import "./vinylForm.css";

function LaserdiscForm() {
  const [formData, setFormData] = useState({
    originalMovieTitle: "",
    image: "",
    year: null,
    teaser: "",
    movieStyle_id: null,
  });
  const [movieStyles, setmovieStyles] = useState([]);
  const [laserdiscs, setlaserdiscs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const addaudioRef = useRef(null);
  const errorAudioRef = useRef(null);
  const cancelAudioRef = useRef(null);

  const getmovieStyles = async () => {
    try {
      const mymovieStyles = await connexion
        .get("/movieStyles")
        .then((res) => res.data);
      setmovieStyles(mymovieStyles);
    } catch (error) {
      console.error("Erreur ajout movieStyle", error);
    }
  };

  const getlaserdiscs = async () => {
    try {
      const mylaserdiscs = await connexion
        .get("/laserdiscs")
        .then((res) => res.data);
      setlaserdiscs(mylaserdiscs);
    } catch (error) {
      console.error("Erreur get laserdiscs", error);
    }
  };

  useEffect(() => {
    console.info(formData);
  }, [formData]);

  useEffect(() => {
    getmovieStyles();
    getlaserdiscs();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "movieStyle_id") {
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
      const response = await connexion.post("/laserdiscs", formData);
      getlaserdiscs();
      setFormData({
        originalMovieTitle: "",
        image: "",
        year: "",
        teaser: "",
        movieStyle_id: "",
      });
      addaudioRef.current.play();
      console.info("Nouveau laserdisc ajouté:", response.data);
    } catch (error) {
      errorAudioRef.current.play();
      console.error("Erreur lors de l'ajout du laserdisc:", error);
    }
  };

  const deletelaserdisc = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this laserdisc?"
    );

    if (confirmDelete) {
      try {
        const response = await connexion.delete(`/laserdiscs/${id}`);
        getlaserdiscs();
        cancelAudioRef.current.play();

        console.info("laserdisc deleted:", response.data);
      } catch (error) {
        console.error("Error deleting the laserdisc:", error);
      }
    } else {
      console.log("Deletion canceled.");
    }
  };

  const putlaserdisc = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/laserdiscs/${formData.id}`, formData);
      getlaserdiscs();
      addaudioRef.current.play();
      console.info("laserdisc modifié");
      setFormData({
        originalMovieTitle: "",
        image: "",
        year: "",
        teaser: "",
        movieStyle_id: "",
      });
    } catch (error) {
      errorAudioRef.current.play();
      console.error("Erreur de la modification du laserdisc:", error);
    }
  };

  const loadlaserdisc = (laserdisc) => {
    setFormData(laserdisc);
  };

  const handleRequest = (e) => {
    if (formData.id) {
      putlaserdisc(e);
    } else {
      handleSubmit(e);
    }
  };

  const filteredlaserdiscs = laserdiscs.filter((laserdisc) =>
    laserdisc.originalMovieTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="searchCtn">
        <div className="search">
          <input
            className="searchbar"
            type="text"
            placeholder="Rechercher un laserdisc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="FormBigCtn">
        <form onSubmit={handleRequest}>
          <h2 className="AddG">Add your own laserdisc</h2>
          <div className="formCtn">
            <div className="inputG">
              <label>
                <p className="formP">Original Movie Title:</p>
                <input
                  type="text"
                  name="originalMovieTitle"
                  value={formData.originalMovieTitle}
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
                <p className="formP">Teaser:</p>
                <input
                  type="text"
                  name="teaser"
                  value={formData.teaser}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <p className="formP">Movie Style</p>
                <select
                  name="movieStyle_id"
                  onChange={handleChange}
                  required
                  value={formData.movieStyle_id}
                >
                  <option value={null}>choisi ton genre</option>
                  {movieStyles.map((movieStyle) => (
                    <option key={movieStyle.id} value={movieStyle.id}>
                      {movieStyle.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button className="buttonA" type="submit">
              {formData.id ? "Modifier" : "Ajouter"}
            </button>
            <audio ref={addaudioRef} src={addSound}>
              <track kind="captions" srcLang="en" label="English_captions" />
            </audio>
            <audio ref={errorAudioRef} src={errorSound}>
              <track kind="captions" srcLang="en" label="English_captions" />
            </audio>
          </div>
        </form>
        <section className="sectionCtn">
          <h2>My laserdiscs</h2>
          <table>
            <thead>
              <tr>
                {/* <th>Place</th> */}
                <th>Image</th>
                <th>Original Title</th>
                <th>Date</th>
                <th>Genre</th>
                <th>Teaser</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {filteredlaserdiscs.map((laserdisc) => {
                return (
                  <tr key={laserdisc.id}>
                    {/* <td>{laserdisc.id}</td> */}
                    <td>
                      <img
                        className="imgList2"
                        src={laserdisc.image}
                        alt="cover laserdisc"
                      />
                    </td>
                    <td>{laserdisc.originalMovieTitle}</td>
                    <td>{laserdisc.year}</td>
                    <td>{laserdisc.movieStyle_label}</td>
                    <td>{laserdisc.teaser}</td>
                    <td className="buttondelput">
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => deletelaserdisc(laserdisc.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => loadlaserdisc(laserdisc)}
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
      <audio ref={cancelAudioRef} src={cancelSound}>
        <track kind="captions" srcLang="en" label="English_captions" />
      </audio>
    </>
  );
}

export default LaserdiscForm;
