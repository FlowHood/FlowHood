import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./navigationBar/NavigationBar";
import LogoutButton from "../buttons/LogoutButton";

import { MdArrowBackIos } from "react-icons/md";
import { VIEWS } from "../../lib/views";

export default function UserLayout({
  showBack = true,
  showLogout = true,
  navigate = { pathname: VIEWS.securityHome },
  children,
}) {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-start px-4 py-8 text-black sm:gap-20 md:gap-10 lg:gap-12">
        <div className="flex min-h-[2vh] flex-col gap-2 self-start sm:px-7">
          {showLogout && (
            <LogoutButton
              action={() => {
                console.log("Cerrar Sesión");
              }}
              className="ml-5 leading-normal lg:relative lg:mb-10 lg:ml-10"
            />
          )}
          {showBack && (
            <Link to={navigate} className="ml-5 lg:ml-10">
              <MdArrowBackIos size={20} />
            </Link>
          )}
        </div>

        {children}
      </div>
      <NavigationBar className="fixed bottom-0" />
    </main>
  );
}
