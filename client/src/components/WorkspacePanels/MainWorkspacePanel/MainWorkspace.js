import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {music[i].length !== 0 &&
              music[i].map(({ id, file, name, type }, index) => (
                <Draggable
                  draggableId={"trackobjectdrag-" + id}
                  index={index}
                  key={"trackobject-" + id}
                >
                  {(provided) => (
                    <div
                      className="track-object"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="type-display">{type}</div>
                      <div className="track-data">{name}</div>
                    </div>
                  )}
                </Draggable>
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
