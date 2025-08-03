import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>📊 CSV File Analyzer</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>{" "}
        {/* New */}
      </ul>
    </nav>
  );
}

export default Navbar;
