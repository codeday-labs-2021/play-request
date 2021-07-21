import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Entry from "./routes/Entry";
import First from "./routes/First";
import Workspace from "./routes/Workspace";

const App = () => {
  // return <h1>Hello, World!</h1>;
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Entry} />
      <Route path="/first" component={First} />
      <Route path="/workspace" component={Workspace} />
    </BrowserRouter>
  );
};

export default App;
