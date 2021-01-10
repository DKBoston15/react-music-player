import React, { useRef } from "react";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  //Event Handlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
