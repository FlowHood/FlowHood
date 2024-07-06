import React from "react";
import {
  LogoInitialsIcon,
  MailIcon,
  MailSelectedIcon,
  PeopleIcon,
  QRIcon,
  StatsIcon,
  UserIcon,
} from "../../components/Icons";
import InfoScheduleCard from "../../components/cards/InfoScheduleCard";
import OptionLink from "../../components/buttons/OptionLink";
import InfoResidentCard, {
  NoHousesCard,
} from "../../components/cards/InfoResidentCard";
import UserLayout from "../../components/user/UserLayout";
import { VIEWS } from "../../lib/views";
import { useAuth } from "../../context/AuthContext";
import { ROL, getHighestPriorityRole } from "../../lib/rol";
import { capitalizeWords, getCurrentShift } from "../../lib/utils";

let homeInformation = {
  homeIdentifier: "123",
  homeName: "Familia Rios",
  homeAddress: "Residencial HLVS, calle principal, pasaje 25, casa #24",
  homeMembers: 3,
};

// Función para obtener información basada en el rol
const HandlerInformationByRol = (roles = [], admHouses) => {
  const currentShift = getCurrentShift();

  const highestRole = getHighestPriorityRole(roles);

  switch (highestRole) {
    case ROL.RESIDENT: {
      const houses = admHouses || [];
      const totalHouses = houses.length;
      const uniqueResidents = new Set();
      houses.forEach((house) =>
        house.residents.forEach((resident) => uniqueResidents.add(resident.id)),
      );

      return houses.length > 0 ? (
        <InfoResidentCard
          totalHouses={totalHouses}
          totalResidents={uniqueResidents.size}
          houseDetails={houses.map((house) => ({
            id: house.id,
            address: house.address,
            active: house.active,
            responsible: house.responsible,
            residents: house.residents,
          }))}
        />
      ) : (
        <NoHousesCard key={highestRole} />
      );
    }
    case ROL.VIGILANT:
      return <InfoScheduleCard key={highestRole} turno={currentShift} />;
    default:
      return <InfoScheduleCard key={highestRole} turno={currentShift} />;
  }
};

// Definir los componentes que deben mostrarse según los roles
const getOptionLinksByRoles = (roles) => {
  console.log(roles);
  const roleComponents = {
    [ROL.VIGILANT]: [
      {
        texto: "Lector de QR de entrada",
        Icono: QRIcon,
        to: VIEWS.scanQR,
      },
      {
        texto: "Registros a terceros",
        Icono: PeopleIcon,
        to: VIEWS.createRequest,
      },
      {
        texto: "Mi Cuenta",
        Icono: UserIcon,
        to: VIEWS.myAccount,
      },
    ],
    [ROL.ADMIN]: [
      {
        texto: "Dashboard",
        Icono: StatsIcon,
        to: VIEWS.dashboard,
      },
      {
        texto: "Generar QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.createQR,
      },
      {
        texto: "Mi Cuenta",
        Icono: UserIcon,
        to: VIEWS.myAccount,
      },
    ],
    [ROL.OWNER]: [
      {
        texto: "Generar QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.createQR,
      },
      {
        texto: "Solicitudes",
        Icono: MailSelectedIcon,
        to: VIEWS.request,
      },
      {
        texto: "Mi Cuenta",
        Icono: UserIcon,
        to: VIEWS.myAccount,
      },
    ],
    [ROL.RESIDENT]: [
      {
        texto: "Generar QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.createQR,
      },
      {
        texto: "Crear Invitación",
        Icono: MailIcon,
        to: VIEWS.createRequest,
      },
      {
        texto: "Solicitudes",
        Icono: MailSelectedIcon,
        to: VIEWS.request,
      },
      {
        texto: "Mi Cuenta",
        Icono: UserIcon,
        to: VIEWS.myAccount,
      },
    ],
    [ROL.VISITOR]: [
      {
        texto: "Generar QR de ingreso",
        Icono: QRIcon,
        to: VIEWS.createQR,
      },
      {
        texto: "Solicitudes",
        Icono: MailSelectedIcon,
        to: VIEWS.request,
      },
      {
        texto: "Mi Cuenta",
        Icono: UserIcon,
        to: VIEWS.myAccount,
      },
    ],
  };

  const uniqueComponentsMap = new Map();
  const addedToSet = new Set();

  roles.forEach((rol) => {
    const components = roleComponents[rol];
    components.forEach((component) => {
      if (!addedToSet.has(component.to)) {
        addedToSet.add(component.to);
        uniqueComponentsMap.set(component.to, component);
      }
    });
  });

  const uniqueComponents = Array.from(uniqueComponentsMap.values());

  return Array.from(uniqueComponents);
};

const SecurityHome = () => {
  const { roles, user } = useAuth();
  console.log(roles, user);
  const optionLinks = getOptionLinksByRoles(roles);

  return (
    <UserLayout showBack={false}>
      <div className="flex min-h-screen w-full flex-col justify-center gap-8 text-black md:gap-10 lg:gap-12">
        <div className="relative flex flex-col items-center justify-evenly gap-5 text-[2.3125rem] font-bold leading-[1.8125rem] lg:flex-row ">
          <div className="mt-14 flex flex-col items-center gap-9 text-center md:gap-14 lg:mt-0">
            <LogoInitialsIcon />
            <p className="inline-flex flex-col gap-2.5 text-[2.4375rem] font-semibold ">
              Bienvenido,
              <span className="text-royal-amethyst ">
                {capitalizeWords(user.name)}
              </span>
            </p>

            {HandlerInformationByRol(roles, user.admHouses)}
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
