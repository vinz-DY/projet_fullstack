import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import "./App.css";
import Logo from "./assets/logo.jpg";
import Vinyl from "./assets/vinyl.jpg";
import Invader from "./assets/invader.png";
import Music from "./assets/you.mp3";

function App() {
  const [isPlaying, setIsPlaying] = useState(false); // État pour gérer la lecture de la musique
  const audioRef = useRef(new Audio(Music)); // useRef pour stocker l'instance d'Audio
  const currentTimeRef = useRef(0); // useRef pour stocker le temps de lecture

  const toggleMusic = () => {
    const audio = audioRef.current; // Accéder à l'Audio à travers la référence

    if (isPlaying) {
      audio.pause();
      currentTimeRef.current = audio.currentTime; // Stocker le temps de lecture actuel
    } else {
      audio.currentTime = currentTimeRef.current; // Rétablir le temps de lecture
      audio.play();
      audio.loop = true;
    }

    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <h1 className="titreA">My Own 80's Collection</h1>
      <div className="collectionCtn">
        <div className="contenaireB">
          <img className="iconebutton" src={Vinyl} alt="" />
          <Link to="/vinyles">
            <button type="button" className="buttonManage">
              My Own VinylS
            </button>
          </Link>
        </div>
        <div className="contenaireB">
          <img className="iconebutton" src={Invader} alt="" />
          <Link to="/games">
            <button type="button" className="buttonManage">
              My Own Games
            </button>
          </Link>
        </div>
      </div>
      <div className="logoContainer">
        <img className="logoHome" src={Logo} alt="" />
        <button type="button" className="play" onClick={toggleMusic}>
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>
    </>
  );
}

export default App;
