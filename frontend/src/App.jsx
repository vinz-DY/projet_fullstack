import { Link } from "react-router-dom";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <>
      <div className="appCtn">
        <h1 className="titreA">My Own Games Collection</h1>
        <Link to="/admin">
          <button type="button" className="buttonManage">
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
