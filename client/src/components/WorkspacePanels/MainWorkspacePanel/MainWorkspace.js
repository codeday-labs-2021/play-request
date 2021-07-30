import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import "./MainWorkspace.css";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#121212",
  border: "3px solid #59636A",
  padding: 8,
  height: "25%",
  display: "flex",
});

const MainWorkspace = ({ music }) => {
  return (
    <div className="timeline">
      <Droppable droppableId="timeline-drop-row-1" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[0].length !== 0 &&
              music[0].map(({ id, file, name, type }) => (
                <div className="track-object" key={id}>
                  <div className="type-display">{type}</div>
                  <div className="track-data">{name}</div>
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="timeline-drop-row-2">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[1].length !== 0 &&
              music[1].map(({ id, file, name, type }) => (
                <div className="track-object" key={id}>
                  <div className="type-display">{type}</div>
                  <div className="track-data">{name}</div>
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="timeline-drop-row-3">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[2].length !== 0 &&
              music[2].map(({ id, file, name, type }) => (
                <div className="track-object" key={id}>
                  <div className="type-display">{type}</div>
                  <div className="track-data">{name}</div>
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="timeline-drop-row-4">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[3].length !== 0 &&
              music[3].map(({ id, file, name, type }) => (
                <div className="track-object" key={id}>
                  <div className="type-display">{type}</div>
                  <div className="track-data">{name}</div>
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default MainWorkspace;
