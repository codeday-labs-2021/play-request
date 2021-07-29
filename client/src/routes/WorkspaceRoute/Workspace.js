import Chatroom from "../../components/WorkspacePanels/ChatroomPanel/Chatroom";
import Effects from "../../components/WorkspacePanels/EffectsPanel/Effects";
import {
  Samples,
  loadedProjectSamples,
  loadedUniversalSamples,
} from "../../components/WorkspacePanels/SamplesPanel/Samples";
import App from "../../components/WorkspacePanels/MainWorkspacePanel/MainWorkspace";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState } from "react";

import "./Workspace.css";

let workspaceMusic = [];

// const [music, updateMusic] = useState(workspaceMusic);

// Function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function getList(id) {
  if (id === "universal-samples") {
    return loadedUniversalSamples;
  } else if (id === "project-samples") {
    return loadedProjectSamples;
  }
}

const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, item);
  return destClone;
};

let onDragEnd = (result) => {
  const { source, destination } = result;

  // dropped outside the list
  if (!destination) {
    return;
  }

  if (source.droppableId !== destination.droppableId) {
    workspaceMusic = copy(
      getList(source.droppableId),
      workspaceMusic,
      source,
      destination
    );
  }

  console.log(workspaceMusic);
};

function Workspace() {
  return (
    <div className="main-wrapper">
      <div className="main-wrapper__wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="wrapper__column">
            <div className="column__chatroom">
              <Chatroom />
            </div>
          </div>
          <div className="wrapper__column">
            <App />
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
