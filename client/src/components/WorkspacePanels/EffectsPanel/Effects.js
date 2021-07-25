import React, { useEffect, useState } from "react";
import "../BoxStyle.css";
import axios from "axios";

function WithLoadingComponent({ isLoading, effects }) {
  if (!isLoading) {
    if (!effects || effects.length === 0) {
      return <p>No Effects :(</p>;
    }
    return Object.keys(effects).map((eff) => {
      return (
        <button key={effects[eff].id} className="button">
          {effects[eff].filename}{" "}
        </button>
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
      <WithLoadingComponent
        isLoading={appState.loading}
        effects={appState.universalEffects}
      />
      <h2 className="panel__subtitle">Project</h2>
      <WithLoadingComponent
        isLoading={appState.loading}
        effects={appState.projectEffects}
      />
    </div>
  );
}

export default Effects;
