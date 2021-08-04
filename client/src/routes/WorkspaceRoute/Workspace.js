import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

// component
function Workspace() {
  const [wsMusic, setWSMusic] = useState(workspaceMusic);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // from sample/effect list to timeline
    if (
      (source.droppableId.includes("sample") ||
        source.droppableId.includes("effect")) &&
      destination.droppableId.includes("timeline-drop")
    ) {
      // gets timeline row index
      let timelineRow =
        parseInt(destination.droppableId.split(/[- ]+/).pop()) - 1;

      let originalList = getList(source.droppableId);

      let cancel = false;

      workspaceMusic[timelineRow].forEach((element) => {
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

        setWSMusic(workspaceMusic);
      } else {
        alert("Each timeline row may only have one instance of a track.");
      }
      // reordering in same row
    } else if (
      source.droppableId.includes("timeline-drop") &&
      source.droppableId === destination.droppableId
    ) {
      console.log("here");
      let timelineRow =
        parseInt(destination.droppableId.split(/[- ]+/).pop()) - 1;
      console.log(timelineRow);
      workspaceMusic[timelineRow] = reorder(
        workspaceMusic[timelineRow],
        source.index,
        destination.index
      );

      setWSMusic(workspaceMusic);
      // drop between timelines
    } else if (
      source.droppableId.includes("timeline-drop") &&
      destination.droppableId.includes("timeline-drop")
    ) {
      let sourceTimelineRow =
        parseInt(source.droppableId.split(/[- ]+/).pop()) - 1;

      let destTimelineRow =
        parseInt(destination.droppableId.split(/[- ]+/).pop()) - 1;

      if (sourceTimelineRow === destTimelineRow) {
        return;
      }

      let moved = move(
        workspaceMusic[sourceTimelineRow],
        workspaceMusic[destTimelineRow],
        source,
        destination
      );

      let cancel = false;

      workspaceMusic[destTimelineRow].forEach((element) => {
        if (element.id === workspaceMusic[sourceTimelineRow][source.index].id) {
          cancel = true;
        }
      });

      if (!cancel) {
        workspaceMusic[sourceTimelineRow] = moved[source.droppableId];
        workspaceMusic[destTimelineRow] = moved[destination.droppableId];
      } else {
        alert("Each timeline row may only have one instance of a track.");
      }

      setWSMusic(workspaceMusic);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="main-wrapper__wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
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
