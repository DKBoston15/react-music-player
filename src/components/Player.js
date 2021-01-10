import React from "react";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  setCurrentSong,
  currentSong,
  songs
}) => {
  //Event Handlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const getTime = time => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (direction === "skip-forward") {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= songs.length) {
        console.log("greater than");
        setCurrentSong(songs[0]);
      } else {
        console.log("less than");
        setCurrentSong(songs[currentIndex + 1]);
      }
    } else {
      let nextIndex = currentIndex - 1;
      if (nextIndex <= 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentIndex - 1]);
      }
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
        />
      </div>
    </div>
  );
};

export default Player;
