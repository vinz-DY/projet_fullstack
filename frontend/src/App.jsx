import { Link } from "react-router-dom";
import "./App.css";
import Logo from "./assets/logo.jpg";

function App() {
  return (
    <>
      <h1 className="titreA">My Own 80's Collection</h1>
      <div className="collectionCtn">
        <Link to="/vinyles">
          <button type="button" className="buttonManage">
            My Own VinylS
          </button>
        </Link>
        <Link to="/games">
          <button type="button" className="buttonManage">
            My Own Games
          </button>
        </Link>
      </div>
      <div className="logoContainer">
        <img className="logoHome" src={Logo} alt="" />
      </div>
    </>
  );
}

export default App;
