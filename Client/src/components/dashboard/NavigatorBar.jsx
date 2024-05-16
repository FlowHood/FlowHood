import React, { useEffect } from "react";
import MenuMobile from "./MenuMobile";
import useResponsiveMenuState from "../../hook/useResponsiveMenuState";
import LogoutButton from "../buttons/LogoutButton";

const NavigatorBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useResponsiveMenuState();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("blocked", "menu-open");
    } else {
      document.body.classList.remove("blocked", "menu-open");
    }
  }, [isMenuOpen]);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div  className="flex items-center gap-4">
          <UserComponent />
          <div className="hidden                    md:block">
            <p className="text-[1.1875rem] font-semibold uppercase leading-[normal] text-[#0c1522]">
              Carmen Sofía Reyes Lopez
            </p>
            <p className="text-[9.838px] uppercase leading-[normal] text-[#9baab7]">
              Último acceso:
              <span> 27 de marzo de 2024</span>
            </p>
          </div>
        </div>
        <LogoutButton
          action={() => {
            console.log("Cerrar Sesión");
          }}
          className="mr-2"
        />
      </div>
      <MenuMobile toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
    </div>
  );
};

const UserComponent = () => {
  return (
    <div className="aspect-square h-11 w-11 rounded-full border-2 border-gray-200 bg-red-100">
      {/* Your component */}
    </div>
  );
};

export default NavigatorBar;
