import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  EntrancesIcon,
  HouseIcon,
  HistoryIcon,
  StatsIcon,
  AccountIcon,
  LogoInitialsIcon,
  ReturnIcon,
} from "../Icons";
import LogoImage from "../../assets/images/logo_horizontal.svg";
import { cn } from "../../lib/utils";
import { VIEWS } from "../../lib/views";

const navigation = [
  { name: "Inicio", href: VIEWS.dashboard, icon: HomeIcon, current: true },
  { name: "Usuarios", href: VIEWS.userList, icon: UserIcon, current: false },
  {
    name: "Entradas",
    href: VIEWS.requestList,
    icon: EntrancesIcon,
    current: false,
  },
  { name: "Casas", href: VIEWS.houseList, icon: HouseIcon, current: false },
  // { name: "Historial", href: "/history", icon: HistoryIcon, current: false },
  { name: "Estadísticas", href: VIEWS.charts, icon: StatsIcon, current: false },
  { name: "Regresar", href: "/", icon: ReturnIcon, current: false },
  // { name: "Cuenta", href: "/account", icon: AccountIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const checkCurrent = (href) => {
    return pathname.toLowerCase() === href.toLowerCase();
  };

  return (
    <div className="menu menu-options flex w-fit max-w-[220px] grow flex-col gap-y-5 border-r border-gray-200 bg-white lg:w-full">
      <div className="mb-6 mt-10 flex justify-center">
        <Link href="/">
          <img
            src={LogoImage}
            alt="FlowHood"
            width={136}
            height={47}
            className="hidden lg:block"
          />
          <LogoInitialsIcon className="lg:hidden" />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      "flex items-center gap-5 px-[1.625rem] py-4 hover:bg-[#f2f1ff]",
                      checkCurrent(item.href)
                        ? "selected-item relative bg-[#f2f1ff]"
                        : "text-gray-700 hover:bg-[#f2f1ff] ",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-10 w-10 shrink-0",
                        checkCurrent(item.href)
                          ? "text-indigo-600"
                          : "text-black group-hover:text-indigo-600",
                      )}
                      aria-hidden="true"
                    />
                    <p className="    font-medium sm:hidden                          lg:block">
                      {item.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
