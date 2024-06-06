import React from "react";
import {
  LogoInitialsIcon,
  MailIcon,
  MailSelectedIcon,
  PeopleIcon,
  QRIcon,
} from "../../components/Icons";
import InfoScheduleCard from "../../components/cards/InfoScheduleCard";
import OptionLink from "../../components/buttons/OptionLink";
import InfoResidentCard from "../../components/cards/InfoResidentCard";
import UserLayout from "../../components/user/UserLayout";
import { VIEWS } from "../../lib/views";
import { useAuth } from "../../context/AuthContext";
import { ROL } from "../../lib/rol";

let homeInformation = {
  homeIdentifier: "123",
  homeName: "Familia Rios",
  homeAddress: "Residencial HLVS, calle principal, pasaje 25, casa #24",
  homeMembers: 3,
};

// Función para obtener información basada en el rol
const HandlerInformationByRol = (roles = []) => {
  return roles.map((rol) => {
    switch (rol) {
      case ROL.RESIDENT:
        return (
          <InfoResidentCard
            key={rol}
            homeIdentifier={homeInformation.homeIdentifier}
            homeName={homeInformation.homeName}
            homeAddress={homeInformation.homeAddress}
            homeMembers={homeInformation.homeMembers}
          />
        );
      case ROL.VIGILANT:
        return <InfoScheduleCard key={rol} turno="Turno Vespertino" />;
      default:
        return <InfoScheduleCard key={rol} turno="Turno Vespertino" />;
    }
  });
};

// Definir los componentes que deben mostrarse según los roles
const getOptionLinksByRoles = (roles) => {
  const commonComponents = [
    {
      texto: "Lector de QR de entrada",
      Icono: QRIcon,
      to: VIEWS.scanQR,
    },
    {
      texto: "Registros a terceros",
      Icono: PeopleIcon,
      to: VIEWS.scanQR,
    },
  ];

  const roleComponents = {
    [ROL.VIGILANT]: commonComponents,
    [ROL.ADMIN]: commonComponents,
    [ROL.RESIDENT]: [
      {
        texto: "QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.scanQR,
      },
      {
        texto: "Crear Invitación",
        Icono: MailIcon,
        to: VIEWS.scanQR,
      },
      {
        texto: "Solicitudes Aprobadas",
        Icono: MailSelectedIcon,
        to: VIEWS.scanQR,
      },
      {
        texto: "Mi Cuenta",
        Icono: QRIcon,
        to: VIEWS.myAccount,
      },
    ],
    [ROL.VISITOR]: [
      {
        texto: "QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.scanQR,
      },
    ],
    [ROL.OWNER]: [
      {
        texto: "QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.scanQR,
      },
      {
        texto: "Solicitudes",
        Icono: MailSelectedIcon,
        to: VIEWS.scanQR,
      },
    ],
  };

  const uniqueComponents = new Set();

  roles.forEach((rol) => {
    (roleComponents[rol] || []).forEach((component) => {
      uniqueComponents.add(component);
    });
  });

  return Array.from(uniqueComponents);
};


const SecurityHome = () => {
  const { roles } = useAuth();
  console.log("Roles", roles);
  const optionLinks = getOptionLinksByRoles(roles);

  return (
    <UserLayout showBack={false}>
      <div className="flex min-h-screen w-full flex-col justify-center gap-8 text-black md:gap-10 lg:gap-12">
        <div className="relative flex flex-col items-center justify-evenly gap-5 text-[2.3125rem] font-bold leading-[1.8125rem] lg:flex-row ">
          <div className="mt-14 flex flex-col items-center gap-9 text-center md:gap-14 lg:mt-0">
            <LogoInitialsIcon />
            <p className="inline-flex flex-col gap-2.5 text-[2.4375rem] font-semibold ">
              Bienvenido,
              <span className="text-royal-amethyst ">Juan Ramos</span>
            </p>

            {HandlerInformationByRol(roles)}
          </div>

          <div className="w-full max-w-[480px] text-start lg:max-w-[400px]">
            <p className="text-[1.0625rem] font-medium text-[#0c1522]">
              ¿Qué haremos hoy?
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-1 lg:pl-10">
              {optionLinks.map((link) => (
                <OptionLink
                  key={link.texto}
                  texto={link.texto}
                  Icono={link.Icono}
                  to={link.to}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="h-[3vh]"></div>
      </div>
    </UserLayout>
  );
};

export default SecurityHome;
