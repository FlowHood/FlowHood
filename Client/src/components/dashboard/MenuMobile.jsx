import React from "react";

const MenuMobile = ({ toggleMenu, isMenuOpen }) => {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="z-50 flex h-[1.15rem] w-7 flex-col justify-between sm:hidden"
      aria-label="Navigation menu"
      aria-expanded={isMenuOpen}
      aria-controls="navbar-menu"
    >
      <span
        className="bar1 | z-10 h-0.5 w-7 transform bg-black transition-all"
        aria-hidden="true"
      ></span>
      <span
        className="bar2 | z-10 h-0.5 w-7 bg-black transition-all"
        aria-hidden="true"
      ></span>
      <span
        className="bar3 | z-10 h-0.5 w-7 transform bg-black transition-all"
        aria-hidden="true"
      ></span>
    </button>
  );
};

export default MenuMobile;
