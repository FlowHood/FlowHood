import React from "react";
import NavigationBarItem from "../NavigationBarItem/NavigationBarItem";
import "./NavigationBar.css";

import { TiHome } from "react-icons/ti";
import { MdEmojiTransportation } from "react-icons/md";
import { MdMarkAsUnread } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdGrading } from "react-icons/md";

export default function NavigationBar({ isOwner = false, className = "" }) {

  //TODO: get path and select one

  let selected = "HOME"

  return (
    <nav className={`nb-container ${className}`}>
      <NavigationBarItem textDescription={"Inicio"} to={"#"} isSelected={selected === "HOME"}>
        <TiHome className="nb-icon" />
      </NavigationBarItem>

      <NavigationBarItem textDescription={"Entradas"} to={"#"}>
        <MdEmojiTransportation className="nb-icon" />
      </NavigationBarItem>

      <NavigationBarItem textDescription={"Invitaciones"} to={"#"}>
        <MdMarkAsUnread className="nb-icon" />
      </NavigationBarItem>

      {isOwner ? (
        <NavigationBarItem textDescription={"Registros"} to={"#"}>
          <mdGrading className="nb-icon" />
        </NavigationBarItem>
      ) : (
        <></>
      )}

      <NavigationBarItem textDescription={"Cuenta"} to={"#"}>
        <MdOutlineManageAccounts className="nb-icon" />
      </NavigationBarItem>
    </nav>
  );
}
