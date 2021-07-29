import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import "../BoxStyle.css";
import "./MainWorkspace.css";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 250,
});
export default class App extends Component {
  render() {
    return (
      <Droppable droppableId="workspace-drop">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
