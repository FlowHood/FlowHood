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
} from "../Icons";
import LogoImage from "../../assets/images/logo_horizontal.svg";
import { cn } from "../../lib/utils";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Usuarios", href: "/users", icon: UserIcon, current: false },
  { name: "Entradas", href: "/entrances", icon: EntrancesIcon, current: false },
  { name: "Casas", href: "/houses", icon: HouseIcon, current: false },
  { name: "Historial", href: "/history", icon: HistoryIcon, current: false },
  { name: "Estadísticas", href: "/stats", icon: StatsIcon, current: false },
  { name: "Cuenta", href: "/account", icon: AccountIcon, current: false },
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
      <div className="mt-10 mb-6 flex justify-center">
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
                    href={item.href}
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
                          : "text-gray-400 group-hover:text-indigo-600",
                      )}
                      aria-hidden="true"
                    />
                    <p className=                       "    sm:hidden font-medium                          lg:block">{item.name}</p>
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
