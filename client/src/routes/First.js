import React from "react";
import PrevWorks from "../components/PrevWork";
import Random from "../components/RandFeatures";
import ListSamples from "../components/Samples";
import LatestChat from "../components/LatestChat";
import LastMix from "../components/LastMix";
import Chatroom from "../components/Chatroom";

function First() {
  return (
    <div className="homePage">
      <h1>homepage</h1>
      <div className="samples">
        <p>ListSamples</p>
      </div>
      <div className="prevWorks">
        <p>Previous Works</p>
      </div>
      <div className="lastMix">
        <p>user's last mix</p>
      </div>
      <div className="randomFeature">
        <p>random features</p>
      </div>
      <div className="lastChat">
        <p>user's last chat</p>
      </div>
      <div className="friendList">
        <p>Friend list</p>
      </div>
    </div>
  );
}

export default First;
