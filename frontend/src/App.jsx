import { Link } from "react-router-dom";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="titreA">My Own Games Collection</h1>
      <div className="collectionCtn">
        <Link to="/vinyles">
          <button type="button" className="buttonManage">
            My Own VinylS
          </button>
        </Link>
      </div>
      <div className="appCtn">
        <Link to="/adminGames">
          <button type="button" className="buttonManages">
            manage Games
          </button>
        </Link>
      </div>
      <div className="MyCard">
        <Card />
      </div>
    </>
  );
}

export default App;
