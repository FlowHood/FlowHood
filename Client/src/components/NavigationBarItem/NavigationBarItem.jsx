import React from "react";  
import { Link } from "react-router-dom";
import "./NavigationBarItem.css"

const NavigationBarItem = ({ to, textDescription, isSelected, children }) => {
  return (
    <Link to={to} className={`${isSelected ? "nbi-selected": ""} nbi-container`}>
        { children }
        <p>{ textDescription }</p>
    </Link>
  )
}

export default NavigationBarItem;