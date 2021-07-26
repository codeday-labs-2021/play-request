import React, { useState } from "react";
import Chatroom from "../../components/WorkspacePanels/ChatroomPanel/Chatroom";
import Effects from "../../components/WorkspacePanels/EffectsPanel/Effects";
import MainWorkspace from "../../components/WorkspacePanels/MainWorkspacePanel/MainWorkspace";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./Workspace.css";

const samplesList = [
  {
    id: 1,
    title: "Sample 1",
  },
  {
    id: 2,
    title: "Sample 2",
  },
  {
    id: 3,
    title: "Sample 3",
  },
  {
    id: 4,
    title: "Sample 4",
  },
  {
    id: 5,
    title: "Sample 5",
  },
];

function Workspace() {
  return (
    <div className="main-wrapper">
      <div className="main-wrapper__wrapper">
        <div className="wrapper__column">
          <div className="column__chatroom">
            <Chatroom />
          </div>
        </div>
        <div className="wrapper__column">
          <MainWorkspace />
        </div>
        <div className="wrapper__column">
          <div className="column_samples">
            <DragDropContext>
              <Droppable droppableId="samples">
                {(provided) => (
                  <ul
                    className="samples"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {samplesList.map(({ id, title }, index) => {
                      return (
                        <Draggable
                          key={id}
                          draggableId={id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div>
                                <span>{title}</span>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="column_soundeffects">
            <Effects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
