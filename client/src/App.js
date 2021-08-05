import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Workspace from "./routes/WorkspaceRoute/Workspace";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Workspace} />
    </BrowserRouter>
  );
};

export default App;
