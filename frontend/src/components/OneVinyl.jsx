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
            <h3>{oneCardVinyl.artist}</h3>
            <p>{oneCardVinyl.title}</p>
            <p>{oneCardVinyl.year}</p>
            <p>{oneCardVinyl.musicStyle_label}</p>
            <p>vinyl color : {oneCardVinyl.color}</p>
            <Link to="/vinyls">
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
