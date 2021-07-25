import React from "react";
import Chatroom from "../../components/WorkspacePanels/ChatroomPanel/Chatroom";
import Samples from "../../components/WorkspacePanels/SamplesPanel/Samples";
import Effects from "../../components/WorkspacePanels/EffectsPanel/Effects";
import Instruments from "../../components/WorkspacePanels/InstrumentsPanel/Instruments";
import MainWorkspace from "../../components/WorkspacePanels/MainWorkspacePanel/MainWorkspace";

import "./Workspace.css";

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
