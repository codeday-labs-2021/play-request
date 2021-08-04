import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const getContainerStyle = (draggableStyle, stateWidth) => ({
  ...draggableStyle,
  width: stateWidth,
});

const TrackObject = (props) => {
  const { musicProps, index, row } = props;
  const [width, setWidth] = useState(100);

  const setAudioDuration = () => {
    if (musicProps.audio.duration <= 3) {
      setWidth(80);
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
      key={"trackobject-" + musicProps.id}
    >
      {(provided) => (
        <div
          className="track-object"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getContainerStyle(provided.draggableProps.style, width)}
        >
          <div className="type-display">{musicProps.type}</div>
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
