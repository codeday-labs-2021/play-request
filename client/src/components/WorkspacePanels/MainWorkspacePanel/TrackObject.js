import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const getContainerStyle = (draggableStyle, stateWidth) => ({
  ...draggableStyle,
  width: stateWidth,
});

const TrackObject = (props) => {
  const { musicProps, musicSetter, music, index, row } = props;
  const [width, setWidth] = useState(100);

  const handleDelete = (event, row, index) => {
    let musicClone = Array.from(music);
    musicClone[row].splice(index, 1);
    musicSetter(musicClone);
  };

  const setAudioDuration = () => {
    if (musicProps.audio.duration <= 3) {
      setWidth(90);
    } else if (musicProps.audio.duration >= 100) {
      setWidth(2 * musicProps.audio.duration);
    } else {
      setWidth(5 * musicProps.audio.duration);
    }
  };

  useEffect(() => {
    if (musicProps.audio.readyState >= 1) {
      setAudioDuration();
    } else {
      musicProps.audio.onloadedmetadata = () => {
        setAudioDuration();
      };
    }
  });

  let track = (
    <Draggable
      draggableId={"trackobjectdrag-" + row + "-" + musicProps.id}
      index={index}
    >
      {(provided) => (
        <div
          className="track-object"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getContainerStyle(provided.draggableProps.style, width)}
        >
          <div className="type-display">
            {musicProps.type}
            <FontAwesomeIcon
              className="trash-icon"
              onClick={(event) => handleDelete(event, row, index)}
              icon={faTrashAlt}
            />
          </div>
          <div className="track-data">
            <audio id={"music-" + musicProps.id} src={musicProps.file}></audio>
            {musicProps.name}
          </div>
        </div>
      )}
    </Draggable>
  );

  return track;
};

export default TrackObject;
