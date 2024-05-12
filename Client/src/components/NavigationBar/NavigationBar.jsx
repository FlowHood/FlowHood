import React from "react";
import NavigationBarItem from "../navigationBarItem/NavigationBarItem";
import "./NavigationBar.css";

import { TiHome } from "react-icons/ti";
import { MdEmojiTransportation } from "react-icons/md";
import { MdMarkAsUnread } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdGrading } from "react-icons/md";

export default function NavigationBar({ isOwner = false, className = "" }) {
  return (
    <nav className={`nb-container ${className}`}>
      <NavigationBarItem textDescription={"Inicio"} to={"#"}>
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
