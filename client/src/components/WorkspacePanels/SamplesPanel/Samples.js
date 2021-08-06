import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import axios from "axios";
import { Entry, Loading } from "../AudioEntry";

let loadedProjectSamples = [];
let loadedUniversalSamples = [];

const WithLoadingComponent = ({ isLoading, samples, type }) => {
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
        <Entry
          trackData={samples[samp]}
          index={index}
          key={"entry-" + samples[samp].id + "-" + index}
        ></Entry>
      );
    });
  }
  return <Loading />;
};

function Samples() {
  const [appState, setAppState] = useState({
    loading: false,
    projectSamples: null,
    universalSamples: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const projectApiUrl = `https://play-request-service.herokuapp.com/project/607eb708-61a6-4cae-aca2-3f789a53dbdf/samples/`;
    const universalApiUrl = `https://play-request-service.herokuapp.com/samples/`;
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
