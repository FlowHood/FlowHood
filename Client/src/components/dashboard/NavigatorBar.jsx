import React, { useEffect } from "react";
import MenuMobile from "./MenuMobile";
import useResponsiveMenuState from "../../hook/useResponsiveMenuState";
import LogoutButton from "../buttons/LogoutButton";
import InfoUserCard from "../cards/InfoUserCard";

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
        <InfoUserCard />
        <LogoutButton className="mr-2" />
      </div>
      <MenuMobile toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default NavigatorBar;
