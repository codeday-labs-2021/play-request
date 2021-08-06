import React, { useState, useRef, useEffect } from "react";
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
import {
  Titlebar,
  Toolbar,
} from "../../components/WorkspacePanels/Toolbar/Toolbar";

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
  item["audio"] = new Audio(item["file"]);

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

// create audio state to handle music composition
const AudioState = (wsMusic) => {
  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };

  // list of current indexes that refer to music that is current playing in each row
  const audioIndex = useRef([-1, -1, -1, -1]);
  // universal state to set the composition to playing or not playing
  const [audioPlaying, setAudioPlaying] = useState(false);
  const forceUpdate = useForceUpdate();

  // play the audio
  const playAudio = () => {
    // only run if the audio isn't playing
    if (!audioPlaying) {
      setAudioPlaying(true);

      // for each row
      for (let i = 0; i < wsMusic.length; i++) {
        // for each piece of music in the row
        for (let j = 0; j < wsMusic[i].length; j++) {
          // set the following piece of music to play after this one ends in the row
          const endedListener = () => {
            audioIndex.current[i] = j + 1;
            forceUpdate();
            wsMusic[i][j + 1]["audio"].play();

            wsMusic[i][j]["audio"].currentTime = 0;
            wsMusic[i][j]["audio"].removeEventListener("ended", endedListener);
          };

          // reset the current index once all the music in the row ends
          const resetListener = () => {
            audioIndex.current[i] = -1;
            forceUpdate();
            // if, once reset, all values are -1, the composition has ended and audio flag can be disabled
            if (
              audioIndex.current.every((currentValue) => currentValue === -1)
            ) {
              setAudioPlaying(false);
            }
            wsMusic[i][j]["audio"].removeEventListener("ended", resetListener);
          };

          // if there is a piece of music following this one in the row
          if (wsMusic[i][j + 1] != null) {
            wsMusic[i][j]["audio"].addEventListener("ended", endedListener);
            // if this is the last piece of music in the row
          } else {
            wsMusic[i][j]["audio"].addEventListener("ended", resetListener);
          }
        }
      }

      // set all current indexes to 0 and start the composition ONLY if all current indexes were -1
      if (audioIndex.current.every((currentValue) => currentValue === -1)) {
        for (let x = 0; x < wsMusic.length; x++) {
          if (wsMusic[x][0] != null) {
            audioIndex.current[x] = 0;
            forceUpdate();
            wsMusic[x][0]["audio"].play();
          }
        }
        // if they all weren't -1, start composition where it left off
      } else {
        for (let x = 0; x < audioIndex.current.length; x++) {
          // the piece that should have been started is missing, which means objects were rearranged. Reset this track to -1.
          if (wsMusic[x][audioIndex.current[x]] == null) {
            audioIndex.current[x] = -1;
            forceUpdate();
            // restart the music normally
          } else {
            wsMusic[x][audioIndex.current[x]]["audio"].play();
          }
        }
      }
    }
  };

  // pause the audio
  const pauseAudio = () => {
    setAudioPlaying(false);
    // iterate through rows
    for (let i = 0; i < wsMusic.length; i++) {
      // if music specified by current index is not null
      if (wsMusic[i][audioIndex.current[i]] != null) {
        // pause the music in this row
        wsMusic[i][audioIndex.current[i]]["audio"].pause();
      }
    }
  };

  // stop the audio
  const stopAudio = () => {
    setAudioPlaying(false);

    // for each row
    for (let i = 0; i < wsMusic.length; i++) {
      // for each piece of music in the row
      for (let j = 0; j < wsMusic[i].length; j++) {
        // if the object is not null
        if (wsMusic[i][j] != null) {
          // reset the music to default, pause it
          let audio = wsMusic[i][j]["audio"];
          audio.pause();
          audio.currentTime = 0;
          let newAudio = audio.cloneNode(true);
          wsMusic[i][j]["audio"] = newAudio;
        }
      }
      // reset current index of row to -1
      audioIndex.current[i] = -1;
      forceUpdate();
    }
  };

  return [audioIndex, playAudio, pauseAudio, stopAudio];
};

// component
function Workspace() {
  const [wsMusic, setWSMusic] = useState(workspaceMusic);
  const [audioIndex, playAudio, pauseAudio, stopAudio] = AudioState(wsMusic);

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
      stopAudio();
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
      stopAudio();

      let timelineRow =
        parseInt(destination.droppableId.split(/[- ]+/).pop()) - 1;
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
      stopAudio();

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
            <Titlebar />
            <MainWorkspace
              music={wsMusic}
              musicSetter={setWSMusic}
              audioIndex={audioIndex}
            />
            <Toolbar
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              stopAudio={stopAudio}
            />
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
