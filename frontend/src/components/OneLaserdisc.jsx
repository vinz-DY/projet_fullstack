import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import "./oneVinyl.css";

function Onelaserdisc() {
  const oneCardlaserdisc = useLoaderData();
  return (
    <div>
      <div className="BigCtn">
        <div className="oneCardVinylCtn">
          <div className="imgCtn">
            <img className="OneImg" src={oneCardlaserdisc.image} alt="" />
          </div>
          <div className="content">
            <h3>{oneCardlaserdisc.originalMovieTitle}</h3>
            <p>{oneCardlaserdisc.year}</p>
            <p>{oneCardlaserdisc.movieStyle_label}</p>
            <Link to="/laserdiscs">
              <button className="button" type="button">
                Back in laserdiscs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onelaserdisc;
