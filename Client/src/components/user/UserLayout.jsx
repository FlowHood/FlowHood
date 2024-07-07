import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./navigationBar/NavigationBar";
import LogoutButton from "../buttons/LogoutButton";

import { MdArrowBackIos } from "react-icons/md";
import { VIEWS } from "../../lib/views";
import GoBackButton from "../buttons/GoBackButton";

export default function UserLayout({
  showBack = true,
  showLogout = true,
  navigate = { pathname: VIEWS.securityHome },
  children,
}) {
  return (
    <main className="">
      <div className="min-h-screen px-4 py-8 pb-11 text-black md:pb-0">
        <div className="fixed top-0 z-30 flex min-h-[2vh] flex-col gap-2 self-start p-5 sm:px-7">
          {showLogout && (
            <LogoutButton
              action={() => {
                console.log("Cerrar Sesión");
              }}
              className="ml-5 leading-normal lg:relative lg:mb-10 lg:ml-10"
            />
          )}
          {showBack && <GoBackButton />}
        </div>
        {showBack && <div className="py-10"></div>}
        {children}
      </div>
      <NavigationBar className="fixed bottom-0" />
    </main>
  );
}
