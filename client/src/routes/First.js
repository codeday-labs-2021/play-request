import React from "react";
import PrevWorks from "../components/PrevWork";
import Random from "../components/RandFeatures";
import ListSamples from "../components/Samples";
import LatestChat from "../components/LatestChat";
import LastMix from "../components/LastMix";
import FriendList from "../components/FriendList";
import "./First.css";

function First() {
  return (
    <div className="row">
      <div className="column1">
        <ListSamples />
        <PrevWorks />
      </div>
      <div className="column2">
        <LastMix />
        <Random />
      </div>
      <div className="column3">
        <LatestChat />
        <FriendList />
      </div>
    </div>
  );
}

export default First;
