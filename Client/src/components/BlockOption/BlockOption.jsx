import React from "react";
import { Link } from "react-router-dom";
import "./BlockOption.css";

export default function BlockOption({ to, textDescription, icon }) {
  return (
    <Link to={to} className="bo-container">
      <div className="bo-row start">{icon}</div>
      <div className="bo-row end">
        <p>{textDescription}</p>
      </div>
    </Link>
  );
}
