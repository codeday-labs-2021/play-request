import React from "react";
import "../BoxStyle.css";
import "./MainWorkspace.css";
//mport "./1.ogg";

const samples = [
  "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
]; //will take in samples from api

//we need a function that get knows which sample the user is working with

var audio = new Audio(
  "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
);

function play_sound() {
  audio.play();
}

function pause_sound() {
  audio.pause();
}

function set_volume() {
  var volume = audio.volume();
  volume = 0.5;
  return console.log(volume);
}

function get_volume() {
  var volume = audio.volume();
  console.log(volume);
  return volume;
}

function increase_volume() {
  var volume = audio.get_volume();
  // if (volume != 0 && volume != 1) {
  //   volume = volume + 0.1;
  // }
  return volume;
}

function decrease_volume() {
  var volume = audio.get_volume();
  volume = volume - 0.1;
  return volume;
}

function restart_sound() {
  if (audio.currentTime == 0) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}

function MainWorkspace() {
  return (
    <div className="panel">
      <h1 className="panel__title">Main Workspace</h1>
      <div className="static-workspace">
        <button className="play-button" onClick={(set_volume, get_volume, play_sound)}>
          play
        </button>
        <button className="pause-button" onClick={pause_sound}>
          pause
        </button>
        <button className="restart-button" onClick={restart_sound}>
          restart
        </button>
        <button className="increase-button" onClick={increase_volume}>
          +
        </button>
        <button className="decrease-button" onClick={decrease_volume}>
          -
        </button>
      </div>
    </div>
  );
}

export default MainWorkspace;
