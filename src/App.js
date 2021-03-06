import React, { useState, useRef } from "react";
//Import Styles
import "./styles/app.scss";
//Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Data
import data from "./util";

function App() {
  const audioRef = useRef(null);

  const timeUpdateHandler = e => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const songEndHandler = () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= songs.length) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[currentIndex + 1]);
    }
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        onEnded={songEndHandler}
        src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
