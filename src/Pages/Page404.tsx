import React from "react";
import "./page.css";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <div id="Container-page404">
        <h1>404</h1>
        <h3>Page not found</h3>
        <Link className="NavLink-Text" to="/">
          <p className="NavLink-Text">Click to go to the Home Page</p>
        </Link>
      </div>
      ;
    </>
  );
}
