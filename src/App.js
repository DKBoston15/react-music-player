import React from "react";
//Import Styles
import "./styles/app.scss";
//Components
import Song from "./components/Song";
import Player from "./components/Player";
//Data
import data from "./util";

function App() {
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
