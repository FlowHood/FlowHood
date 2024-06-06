import React from "react";
import LogoutButton from "../../components/buttons/LogoutButton";
import { LogoInitialsIcon, PeopleIcon, QRIcon } from "../../components/Icons";
import InfoScheduleCard from "../../components/cards/InfoScheduleCard";
import OptionLink from "../../components/buttons/OptionLink";
import InfoResidentCard from "../../components/cards/InfoResidentCard";
import UserLayout from "../../components/user/UserLayout";
import { VIEWS } from "../../lib/views";

let UserROL = "VGT"; //ADM administrador, VST visitante, VGT vigilante, RST residente, ECG encargado

let homeInformation = {
  homeIdentifier: "123",
  homeName: "Familia Rios",
  homeAddress: "Residencial HLVS, calle principal, pasaje 25, casa #24",
  homeMembers: 3,
};

//TODO: do this on hook
const HandlerInformationByRol = (rol = "") => {
  switch (UserROL) {
    case "RST":
      return (
        <InfoResidentCard
          homeIdentifier={homeInformation.homeIdentifier}
          homeName={homeInformation.homeName}
          homeAddress={homeInformation.homeAddress}
          homeMembers={homeInformation.homeMembers}
        />
      );
    case "VGT":
      return <InfoScheduleCard turno="Turno Vespertino" />;
  }
};

const SecurityHome = () => {
  //TODO: add service to know current rol user

  return (
    <UserLayout showBack={false}>
      <div className="flex min-h-screen flex-col justify-center gap-8 text-black md:gap-10 lg:gap-12">
        <div className="relative flex flex-col items-center justify-evenly gap-5 text-[2.3125rem] font-bold leading-[1.8125rem] lg:flex-row ">
          <div className="mt-14 flex flex-col items-center gap-9 text-center md:gap-14 lg:mt-0">
            <LogoInitialsIcon />
            <p className="inline-flex flex-col gap-2.5 text-[2.4375rem] font-semibold ">
              Bienvenido,
              <span className="text-royal-amethyst ">Juan Ramos</span>
            </p>

            {HandlerInformationByRol(UserROL)}
          </div>

          <div className="w-full max-w-[480px] text-start lg:max-w-[400px]">
            <p className="text-[1.0625rem] font-medium text-[#0c1522]">
              ¿Qué haremos hoy?
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:pl-10">
              <OptionLink
                texto="Lector de QR de entrada"
                Icono={QRIcon}
                to={VIEWS.scanQR}
              />
              <OptionLink
                texto="Registros a terceros"
                Icono={PeopleIcon}
                to={"/security/"}
              />
            </div>
          </div>
        </div>
        <div className="h-[3vh]"></div>
      </div>
    </UserLayout>
  );
};

export default SecurityHome;
