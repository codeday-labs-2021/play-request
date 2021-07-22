import React from "react";
import LatestChat from "../components/LatestChat";
import Samples from "../components/Samples";
import "./Workspace.css";

function Instruments() {
  return <span>Instruments</span>;
}

function SoundEffects() {
  return <span>Sound effects</span>;
}

function MainWorkspace() {
  return <span>Main workspace</span>;
}

function Workspace() {
  return (
    <div className="wrapper">
      <div className="column">
        <div className="column__chatroom">
          <LatestChat />
        </div>
        <div className="column__instrument">
          <Instruments />
        </div>
      </div>
      <div className="column">
        <MainWorkspace />
      </div>
      <div className="column">
        <div className="column_samples">
          <Samples />
        </div>
        <div className="column_soundeffects">
          <SoundEffects />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
