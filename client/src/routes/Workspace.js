import React from "react";
import Chatroom from "../components/Chatroom";
import Samples from "../components/Samples";
import Effects from "../components/Effects";

import "./Workspace.css";

function Instruments() {
  return <span>Instruments</span>;
}

function MainWorkspace() {
  return <span>Main workspace</span>;
}

function Workspace() {
  return (
    <div className="main-wrapper">
      <div className="main-wrapper__wrapper">
        <div className="wrapper__column">
          <div className="column__chatroom">
            <Chatroom />
          </div>
          <div className="column__instrument">
            <Instruments />
          </div>
        </div>
        <div className="wrapper__column">
          <MainWorkspace />
        </div>
        <div className="wrapper__column">
          <div className="column_samples">
            <Samples />
          </div>
          <div className="column_soundeffects">
            <Effects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
