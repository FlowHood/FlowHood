import React from "react";
import LogoutButton from "../../components/buttons/LogoutButton";
import { LogoInitialsIcon, PeopleIcon, QRIcon } from "../../components/Icons";
import InfoScheduleCard from "../../components/cards/InfoScheduleCard";
import OptionLink from "../../components/buttons/OptionLink";

const SecurityHome = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-8 px-8 py-10 text-black md:gap-10 lg:gap-12">
      <div className="relative flex flex-col items-center justify-evenly gap-5 text-[2.3125rem] font-bold leading-[1.8125rem] lg:flex-row ">
        <div className="mt-10 flex flex-col items-center gap-9 text-center md:gap-14 lg:mt-0">
          <LogoInitialsIcon />
          <p className="inline-flex flex-col gap-2.5 text-[2.4375rem] font-semibold ">
            Bienvenido,
            <span className="text-royal-amethyst ">Juan Ramos</span>
          </p>
          <InfoScheduleCard turno="Turno Vespertino" />
        </div>

        <div className="w-full max-w-[480px] lg:max-w-[400px] text-start">
          <LogoutButton
            action={() => {
              console.log("Cerrar Sesión");
            }}
            className="absolute left-0 top-0 leading-normal lg:relative lg:mb-10 lg:ml-10"
          />
          <p className="text-[1.0625rem] font-medium text-[#0c1522]">
            ¿Qué haremos hoy?
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-1 lg:pl-10">
            <OptionLink
              texto="Lector de QR de entrada"
              Icono={QRIcon}
              to={"/security/"}
            />
            <OptionLink
              texto="Registros a terceros"
              Icono={PeopleIcon}
              to={"/security/"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityHome;
