import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Video from "./Video";
import "./oneVinyl.css";
import "./oneLaserdisc.css";

function Onelaserdisc() {
  const oneCardlaserdisc = useLoaderData();
  return (
    <div>
      <div className="BigCtn">
        <div className="oneCardVinylCtn video">
          <div className="imgCtn video">
            {/* <img className="OneImg" src={oneCardlaserdisc.image} alt="" /> */}
            <Video oneCardlaserdisc={oneCardlaserdisc} />
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
