import React from "react";  
import { Link } from "react-router-dom";
import "./NavigationBarItem.css"

const NavigationBarItem = ({ to, textDescription, children }) => {
  return (
    <Link to={to} className="nbi-container">
        { children }
        <p>{ textDescription }</p>
    </Link>
  )
}

export default NavigationBarItem;