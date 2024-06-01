import React, { useState } from "react";
import NavigationBarItem from "../navigationBarItem/NavigationBarItem";
import "./NavigationBar.css";

import { TiHome } from "react-icons/ti";
import { MdEmojiTransportation } from "react-icons/md";
import { MdMarkAsUnread } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { VIEWS } from "../../../lib/views";

export default function NavigationBar({ isOwner = false, className = "" }) {
  //TODO: get path and select one
  const location = useLocation();
  const [currentView, setCurrentView] = useState(
    location.pathname || VIEWS.HOME,
  );

  return (
    <nav className={`nb-container ${className}`}>
      <NavigationBarItem
        textDescription={"Inicio"}
        to={VIEWS.securityHome}
        isSelected={currentView === VIEWS.securityHome}
        onClick={() => setCurrentView(VIEWS.securityHome)}
      >
        <TiHome className="nb-icon" />
      </NavigationBarItem>

      <NavigationBarItem
        textDescription={"Entradas"}
        to={VIEWS.createQR}
        isSelected={currentView === VIEWS.createQR}
        onClick={() => setCurrentView(VIEWS.createQR)}
      >
        <MdEmojiTransportation className="nb-icon" />
      </NavigationBarItem>

      <NavigationBarItem
        textDescription={"Invitaciones"}
        to={VIEWS.request}
        onClick={() => setCurrentView(VIEWS.request)}
        isSelected={currentView === VIEWS.request}
      >
        <MdMarkAsUnread className="nb-icon" />
      </NavigationBarItem>

      {/* TODO: missing history screen */}
      {isOwner ? (
        <NavigationBarItem textDescription={"Registros"} to={"#"}>
          <mdGrading className="nb-icon" />
        </NavigationBarItem>
      ) : (
        <></>
      )}

      <NavigationBarItem
        textDescription={"Cuenta"}
        to={VIEWS.test}
        onClick={() => setCurrentView(VIEWS.test)}
        isSelected={currentView === VIEWS.test}
      >
        <MdOutlineManageAccounts className="nb-icon" />
      </NavigationBarItem>
    </nav>
  );
}
