import { Link } from "react-router-dom";
import "./App.css";
import Logo from "./assets/logo.jpg";
import Vinyl from "./assets/vinyl.jpg";
import Invader from "./assets/invader.png";

function App() {
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
      </div>
    </>
  );
}

export default App;
