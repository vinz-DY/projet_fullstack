import React from "react";
import ReactPlayer from "react-player";

function Video({ oneCardlaserdisc }) {
  return (
    <div className="video_ctn">
      <ReactPlayer
        url={oneCardlaserdisc.teaser}
        controls
        // playing
        width="98%"
        height="100%"
        className="player_video"
      />
    </div>
  );
}

export default Video;
