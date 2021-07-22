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
    <div class="container">
      <div class="row">
        <div class="col-1">
          <ListSamples />
        </div>
        <div class="col-2">
          <LastMix />
        </div>
        <div class="col-3">
          <LatestChat />
        </div>
      </div>
      <div class="row">
        <div class="col-1">
          <PrevWorks />
        </div>
        <div class="col-2">
          <Random />
        </div>
        <div class="col-3">
          <FriendList />
        </div>
      </div>
    </div>
  );
}

export default First;
