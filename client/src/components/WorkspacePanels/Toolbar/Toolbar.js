import React from "react";
import "./Toolbar.css";
import projectIcon from "./play_icon.png";

const Toolbar = () => {
  return (
    <>
      <div className="toolbar-wrapper"></div>
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
