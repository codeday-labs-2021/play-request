import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import "./MainWorkspace.css";
import TrackObject from "./TrackObject";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#191919" : "#121212",
  border: "3px solid " + (isDraggingOver ? "lightblue" : "#59636A"),
  padding: 8,
  flex: "1",
  display: "flex",
});

const MainWorkspace = ({ music, musicSetter }) => {
  let rows = [];

  for (let i = 0; i < 4; i++) {
    rows.push(
      <Droppable
        droppableId={"timeline-drop-row-" + (i + 1)}
        direction="horizontal"
        key={"timeline-droppable-" + i}
      >
        {(provided, snapshot) => (
          <div
            className="timeline-row"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[i].length !== 0 &&
              music[i].map((props, index) => (
                <TrackObject
                  musicProps={props}
                  index={index}
                  row={i}
                  musicSetter={musicSetter}
                  music={music}
                  key={"trackobj-" + i + "-" + props.id}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  return <div className="timeline">{rows}</div>;
};

export default MainWorkspace;
