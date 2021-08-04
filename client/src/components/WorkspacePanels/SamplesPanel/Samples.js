import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
// import flock from "flocking";
import "../BoxStyle.css";
import axios from "axios";

let loadedProjectSamples = [];
let loadedUniversalSamples = [];

function WithLoadingComponent({ isLoading, samples, type }) {
  if (!isLoading) {
    if (!samples || samples.length === 0) {
      return <p>No Samples :(</p>;
    }
    if (type === "universal") {
      loadedUniversalSamples = [];
    } else if (type === "project") {
      loadedProjectSamples = [];
    }

    return Object.keys(samples).map((samp, index) => {
      if (type === "universal") {
        loadedUniversalSamples.push({
          id: samples[samp].id,
          file: samples[samp].downloadURL,
          name: samples[samp].filename,
          type: "SAMPLE",
        });
      } else if (type === "project") {
        loadedProjectSamples.push({
          id: samples[samp].id,
          file: samples[samp].downloadURL,
          name: samples[samp].filename,
          type: "SAMPLE",
        });
      }

      return (
        <Draggable
          draggableId={samples[samp].id}
          index={index}
          key={"sampledragkey-" + samples[samp].id}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="button"
            >
              <div className="samples-text-div">{samples[samp].filename}</div>

              <canvas
                className="button-canvas"
                id={"canvas-" + samples[samp].id}
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

function Samples() {
  const [appState, setAppState] = useState({
    loading: false,
    projectSamples: null,
    universalSamples: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const projectApiUrl = `http://localhost:4000/project/607eb708-61a6-4cae-aca2-3f789a53dbdf/samples/`;
    const universalApiUrl = `http://localhost:4000/samples/`;
    const getSamples = async () => {
      let data = await axios.all([
        axios.get(universalApiUrl),
        axios.get(projectApiUrl),
      ]);
      setAppState({
        loading: false,
        universalSamples: data[0].data,
        projectSamples: data[1].data,
      });
    };
    getSamples();
  }, [setAppState]);

  return (
    <div className="panel">
      <h1 className="panel__title">Samples</h1>
      <h2 className="panel__subtitle">Universal</h2>
      <Droppable droppableId="universal-samples" isDropDisabled={true}>
        {(provided) => (
          <div
            className="samples-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <WithLoadingComponent
              isLoading={appState.loading}
              samples={appState.universalSamples}
              type="universal"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <h2 className="panel__subtitle">Project</h2>
      <Droppable droppableId="project-samples" isDropDisabled={true}>
        {(provided) => (
          <div
            className="samples-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <WithLoadingComponent
              isLoading={appState.loading}
              samples={appState.projectSamples}
              type="project"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export { Samples, loadedProjectSamples, loadedUniversalSamples };
