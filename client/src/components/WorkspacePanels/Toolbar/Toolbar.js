import React from "react";
import "./Toolbar.css";
import projectIcon from "./play_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = (props) => {
  const { playAudio, pauseAudio, stopAudio } = props;

  const handlePlay = () => {
    playAudio();
  };

  const handlePause = () => {
    pauseAudio();
  };

  const handleStop = () => {
    stopAudio();
  };

  return (
    <>
      <div className="toolbar-wrapper">
        <div className="controls-wrapper">
          <FontAwesomeIcon className="control-icon" icon={faStepBackward} />
          <FontAwesomeIcon
            onClick={handlePlay}
            className="control-icon"
            icon={faPlay}
            size="2x"
          />
          <FontAwesomeIcon
            onClick={handlePause}
            className="control-icon"
            icon={faPause}
            size="2x"
          />
          <FontAwesomeIcon
            onClick={handleStop}
            className="control-icon"
            icon={faStop}
            size="2x"
          />
          <FontAwesomeIcon className="control-icon" icon={faStepForward} />
        </div>
      </div>
    </>
  );
};

const Titlebar = () => {
  return (
    <>
      <div className="titlebar-wrapper">
        <div className="icon-wrapper">
          <img src={projectIcon} alt="icon" height="30px"></img>
        </div>
        <div className="title-wrapper">
          <h1 className="title">Press Play</h1>
        </div>
      </div>
    </>
  );
};

export { Toolbar, Titlebar };
