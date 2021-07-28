import React from "react";
import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Login from "./routes/LoginRoute/Login";
import Workspace from "./routes/WorkspaceRoute/Workspace";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Login} />
      <Route path="/workspace" component={Workspace} />
    </BrowserRouter>

  );
};


export default App;

