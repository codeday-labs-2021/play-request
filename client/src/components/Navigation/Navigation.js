import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Login</Link>
      <Link to="/workspace">Workspace</Link>
    </div>
  );
}

export default Navigation;
