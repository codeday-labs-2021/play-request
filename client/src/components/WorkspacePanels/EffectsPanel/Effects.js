import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import axios from "axios";

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
        <Draggable
          draggableId={effects[eff].id}
          index={index}
          key={"effectdragkey-" + effects[eff].id}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="button"
            >
              <div className="effects-text-div">{effects[eff].filename}</div>

              <canvas
                className="button-canvas"
                id={"canvas-" + effects[eff].id}
              ></canvas>
            </div>
          )}
        </Draggable>
      );
    });
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: `auto`,
        background: `none`,
        display: `block`,
        shapeRendering: `auto`,
      }}
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#4297de"
        strokeWidth="5"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;44"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#86eef9"
        strokeWidth="5"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;44"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
      </circle>
    </svg>
  );
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
