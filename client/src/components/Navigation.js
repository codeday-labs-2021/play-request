import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Log in/Sign up</Link>
      <Link to="/first">First page</Link>
      <Link to="/workspace">Workspace</Link>
    </div>
  );
}

export default Navigation;
