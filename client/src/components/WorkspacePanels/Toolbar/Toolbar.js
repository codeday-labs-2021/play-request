import React from "react";
import {
  faPlay,
  faStop,
  faStepForward,
  faFastForward,
  faFastBackward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Toolbar.css";

function Toolbar() {
  return (
    <div>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faFastBackward} />
      </button>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faStop} />
      </button>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faStepForward} />
      </button>
      <button className="toolbar-btn">
        <FontAwesomeIcon icon={faFastForward} />
      </button>
    </div>
  );
}

export default Toolbar;
