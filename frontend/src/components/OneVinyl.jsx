import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./oneVinyl.css";

function OneVinyl() {
  const oneCardVinyl = useLoaderData();
  return (
    <div>
      <div className="BigCtn">
        <div className="oneCardVinylCtn">
          <div className="imgCtn">
            <img className="OneImg" src={oneCardVinyl.image} alt="" />
          </div>
          <div className="content">
            <h3>{oneCardVinyl.title}</h3>
            <p>{oneCardVinyl.year}</p>
            <p>{oneCardVinyl.console}</p>
            <p>{oneCardVinyl.genre_label}</p>
            <Link to="/vinyles">
              <button className="button" type="button">
                Back in Vinyls
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneVinyl;
