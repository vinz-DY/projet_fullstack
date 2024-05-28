import React, { useState, useEffect, useRef } from "react";
import connexion from "../services/connexion";
import addSound from "../assets/add.mp3";
import errorSound from "../assets/error.mp3";
import cancelSound from "../assets/canceled.mp3";
import "./vinylForm.css";

function VinylForm() {
  const [formData, setFormData] = useState({
    artist: "",
    title: "",
    image: "",
    year: null,
    color: "",
    musicStyle_id: null,
  });
  const [musicStyles, setmusicStyles] = useState([]);
  const [discs, setdiscs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const addaudioRef = useRef(null);
  const errorAudioRef = useRef(null);
  const cancelAudioRef = useRef(null);

  const getmusicStyles = async () => {
    try {
      const mymusicStyles = await connexion
        .get("/musicStyles")
        .then((res) => res.data);
      setmusicStyles(mymusicStyles);
    } catch (error) {
      console.error("Erreur ajout musicStyle", error);
    }
  };

  const getdiscs = async () => {
    try {
      const mydiscs = await connexion.get("/discs").then((res) => res.data);
      setdiscs(mydiscs);
    } catch (error) {
      console.error("Erreur get discs", error);
    }
  };

  useEffect(() => {
    console.info(formData);
  }, [formData]);

  useEffect(() => {
    getmusicStyles();
    getdiscs();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "musicStyle_id") {
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
      const response = await connexion.post("/discs", formData);
      getdiscs();
      setFormData({
        artist: "",
        title: "",
        image: "",
        year: "",
        color: "",
        musicStyle_id: "",
      });
      addaudioRef.current.play();
      console.info("Nouveau vinyle ajouté:", response.data);
    } catch (error) {
      errorAudioRef.current.play();
      console.error("Erreur lors de l'ajout du vinyle:", error);
    }
  };

  const deletedisc = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this disc?"
    );

    if (confirmDelete) {
      try {
        const response = await connexion.delete(`/discs/${id}`);
        getdiscs();
        cancelAudioRef.current.play();
        console.info("disc deleted:", response.data);
      } catch (error) {
        console.error("Error deleting the disc:", error);
      }
    } else {
      console.log("Deletion canceled.");
    }
  };

  const putdisc = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/discs/${formData.id}`, formData);
      getdiscs();
      addaudioRef.current.play();
      console.info("vinyle modifié");
      setFormData({
        artist: "",
        title: "",
        image: "",
        year: "",
        color: "",
        musicStyle_id: "",
      });
    } catch (error) {
      errorAudioRef.current.play();
      console.error("Erreur de la modification du vinyle:", error);
    }
  };

  const loaddisc = (disc) => {
    setFormData(disc);
  };

  const handleRequest = (e) => {
    if (formData.id) {
      putdisc(e);
    } else {
      handleSubmit(e);
    }
  };

  const filtereddiscs = discs.filter((disc) =>
    disc.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="searchCtn">
        <div className="search">
          <input
            className="searchbar"
            type="text"
            placeholder="Rechercher un vinyle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="FormBigCtn">
        <form onSubmit={handleRequest}>
          <h2 className="AddG">Add your own disc</h2>
          <div className="formCtn">
            <div className="inputG">
              <label>
                <p className="formP">Artist:</p>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                />
              </label>
            </div>
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
                <p className="formP">Color disc:</p>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <p className="formP">musicStyle</p>
                <select
                  name="musicStyle_id"
                  onChange={handleChange}
                  required
                  value={formData.musicStyle_id}
                >
                  <option value={null}>choisi ton style</option>
                  {musicStyles.map((musicStyle) => (
                    <option key={musicStyle.id} value={musicStyle.id}>
                      {musicStyle.label}
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
          <h2>discs</h2>
          <table>
            <thead>
              <tr>
                {/* <th>Place</th> */}
                <th>Image</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Date</th>
                <th>Style</th>
                <th>Color</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {filtereddiscs.map((disc) => {
                return (
                  <tr key={disc.id}>
                    {/* <td>{disc.id}</td> */}
                    <td>
                      <img
                        className="imgList2"
                        src={disc.image}
                        alt="cover disc"
                      />
                    </td>
                    <td>{disc.artist}</td>
                    <td>{disc.title}</td>
                    <td>{disc.year}</td>
                    <td>{disc.musicStyle_label}</td>
                    <td>{disc.color}</td>
                    <td className="buttondelput">
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => deletedisc(disc.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="dpButton"
                        type="button"
                        onClick={() => loaddisc(disc)}
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

export default VinylForm;
