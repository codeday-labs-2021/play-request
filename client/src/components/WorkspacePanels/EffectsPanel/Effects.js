import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import axios from "axios";
import { Entry, Loading } from "../AudioEntry";

let loadedProjectEffects = [];
let loadedUniversalEffects = [];

function WithLoadingComponent({ isLoading, effects, type }) {
  if (!isLoading) {
    if (!effects || effects.length === 0) {
      return <p>No Effects :(</p>;
    }
    if (type === "universal") {
      loadedUniversalEffects = [];
    } else if (type === "project") {
      loadedProjectEffects = [];
    }

    return Object.keys(effects).map((eff, index) => {
      if (type === "universal") {
        loadedUniversalEffects.push({
          id: effects[eff].id,
          file: effects[eff].downloadURL,
          name: effects[eff].filename,
          type: "EFFECT",
        });
      } else if (type === "project") {
        loadedProjectEffects.push({
          id: effects[eff].id,
          file: effects[eff].downloadURL,
          name: effects[eff].filename,
          type: "EFFECT",
        });
      }

      return (
        <Entry
          trackData={effects[eff]}
          index={index}
          key={"entry-" + effects[eff].id + "-" + index}
        ></Entry>
      );
    });
  }
  return <Loading />;
}

function Effects() {
  const [appState, setAppState] = useState({
    loading: false,
    projectEffects: null,
    universalEffects: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const projectApiUrl = `http://localhost:4000/project/607eb708-61a6-4cae-aca2-3f789a53dbdf/effects/`;
    const universalApiUrl = `http://localhost:4000/effects/`;
    const getEffects = async () => {
      let data = await axios.all([
        axios.get(universalApiUrl),
        axios.get(projectApiUrl),
      ]);
      setAppState({
        loading: false,
        universalEffects: data[0].data,
        projectEffects: data[1].data,
      });
    };
    getEffects();
  }, [setAppState]);

  return (
    <div className="panel">
      <h1 className="panel__title">Effects</h1>
      <h2 className="panel__subtitle">Universal</h2>
      <Droppable droppableId="universal-effects" isDropDisabled={true}>
        {(provided) => (
          <div
            className="effects-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <WithLoadingComponent
              isLoading={appState.loading}
              effects={appState.universalEffects}
              type="universal"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <h2 className="panel__subtitle">Project</h2>
      <Droppable droppableId="project-effects" isDropDisabled={true}>
        {(provided) => (
          <div
            className="effects-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <WithLoadingComponent
              isLoading={appState.loading}
              effects={appState.projectEffects}
              type="project"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export { Effects, loadedProjectEffects, loadedUniversalEffects };
