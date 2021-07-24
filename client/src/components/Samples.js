import React, { useEffect, useState } from "react";
import "./BoxStyle.css";
import axios from "axios";

function WithLoadingComponent({ isLoading, samples }) {
  if (!isLoading) {
    if (!samples || samples.length === 0) {
      return <p>No Samples :(</p>;
    }
    return Object.keys(samples).map((samp) => {
      return (
        <button key={samples[samp].id} className="button">
          {samples[samp].filename}{" "}
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
    <div className="box-container">
      <h1 className="box-title">Samples</h1>
      <h2 className="sub-text">Universal</h2>
      <WithLoadingComponent
        isLoading={appState.loading}
        samples={appState.universalSamples}
      />
      <h2 className="sub-text">Project</h2>
      <WithLoadingComponent
        isLoading={appState.loading}
        samples={appState.projectSamples}
      />
    </div>
  );
}

export default Samples;
