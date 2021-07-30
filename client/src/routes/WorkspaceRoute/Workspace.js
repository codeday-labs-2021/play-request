import Chatroom from "../../components/WorkspacePanels/ChatroomPanel/Chatroom";
import {
  Effects,
  loadedProjectEffects,
  loadedUniversalEffects,
} from "../../components/WorkspacePanels/EffectsPanel/Effects";
import {
  Samples,
  loadedProjectSamples,
  loadedUniversalSamples,
} from "../../components/WorkspacePanels/SamplesPanel/Samples";
import MainWorkspace from "../../components/WorkspacePanels/MainWorkspacePanel/MainWorkspace";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState } from "react";

import "./Workspace.css";

let workspaceMusic = [[], [], [], []];

function getList(id) {
  if (id === "universal-samples") {
    return loadedUniversalSamples;
  } else if (id === "project-samples") {
    return loadedProjectSamples;
  } else if (id === "project-effects") {
    return loadedProjectEffects;
  } else if (id === "universal-effects") {
    return loadedUniversalEffects;
  }
}

const copy = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  timelineRow
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone[timelineRow].splice(droppableDestination.index, 0, item);
  return destClone;
};

// component
function Workspace() {
  const [wsMusic, setWSMusic] = useState(workspaceMusic);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId !== destination.droppableId &&
      destination.droppableId.includes("timeline-drop")
    ) {
      // gets timeline row index
      let timelineRow =
        parseInt(destination.droppableId.split(/[- ]+/).pop()) - 1;

      let originalList = getList(source.droppableId);

      let cancel = false;

      workspaceMusic[timelineRow].forEach((element) => {
        console.log(element);
        if (element.id === originalList[source.index].id) {
          cancel = true;
        }
      });

      if (!cancel) {
        workspaceMusic = copy(
          originalList,
          workspaceMusic,
          source,
          destination,
          timelineRow
        );
        console.log(workspaceMusic);
        setWSMusic(workspaceMusic);
      } else {
        alert("Each timeline row may only have one instance of a track.");
      }
    }
  };

  return (
    <div className="main-wrapper">
      <div className="main-wrapper__wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="wrapper__column">
            <div className="column__chatroom">
              <Chatroom />
            </div>
          </div>
          <div className="wrapper__column">
            <MainWorkspace music={wsMusic} />
          </div>
          <div className="wrapper__column">
            <div className="column__samples">
              <Samples />
            </div>
            <div className="column__soundeffects">
              <Effects />
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Workspace;
