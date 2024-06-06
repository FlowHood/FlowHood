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
    <main className="min-h-screen pb-11 md:pb-0">
      <div className="px-4 py-8 text-black">
        <div className="flex min-h-[2vh] flex-col gap-2 self-start sm:px-7 fixed top-0 p-5">
          {showLogout && (
            <LogoutButton
              action={() => {
                console.log("Cerrar Sesión");
              }}
              className="ml-5 leading-normal lg:relative lg:mb-10 lg:ml-10"
            />
          )}
          {showBack && (
            <GoBackButton />
          )}
        </div>

        {children}
      </div>
      <NavigationBar className="fixed bottom-0" />
    </main>
  );
}
