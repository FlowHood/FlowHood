import React from "react";

import GeneralButton from "../buttons/GeneralButton";
import UserRequestContainer from "../UserRequestContainer";
import RequestFilterBar from "./filterBar/RequestFilterBar";
import { ROL } from "../../lib/rol";

/*
example 

*/

const list = [
  {
    id: "1",
    name: "Henry Lima",
    date: "2024/07/12",
  },
  { id: "2", name: "Ana García", date: "2024/08/05" },
  { id: "3", name: "Carlos Pérez", date: "2024/09/20" },
  { id: "4", name: "María Rodríguez", date: "2024/10/15" },
  { id: "5", name: "Luis Martínez", date: "2024/11/03" },
  { id: "6", name: "Isabel Flores", date: "2024/12/08" },
  { id: "7", name: "David Torres", date: "2025/01/18" },
  { id: "8", name: "Laura Ramírez", date: "2025/02/22" },
  { id: "9", name: "Javier Herrera", date: "2025/03/10" },
  { id: "10", name: "Patricia Castro", date: "2025/04/05" },
  { id: "11", name: "Gabriel López", date: "2025/05/14" },
  { id: "12", name: "Carmen Morales", date: "2025/06/29" },
  { id: "13", name: "Daniel Sánchez", date: "2025/07/07" },
  { id: "44", name: "Sofía Ortiz", date: "2025/08/19" },
  { id: "45", name: "Diego Vásquez", date: "2025/09/25" },
];

const getScreenInformation = (rol) => {
  let title;
  let subTitle;
  let subTitle2;

  switch (rol) {
    case ROL.OWNER:
      title = "Crear invitacion para visitas";
      subTitle =
        "Crea y mantente pendiente del estado de las invitaciones que generes para tus invitados.";
      subTitle2 = "Mantente pendiente del estado de tus solicitudes";
      break;
    case ROL.RESIDENT:
      title = "Invitaciones de visitantes a tu hogar";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas por los integrantes de tu hogar o crea la tuya propia.";
      subTitle2 =
        "Gestiona las solicitudes de invitación de los integrantes de tu hogar.";
      break;

    case ROL.VISITOR:
      title = "Tus Invitaciones de visitas";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas por los integrantes de tu hogar o crea la tuya propia.";
    default:
      break;
  }

  return {
    title,
    subTitle,
    subTitle2,
  };
};

export default function UserAllRequest() {
  //Get user and verify rol
  let rol = ROL.RESIDENT;
  let { title, subTitle, subTitle2 } = getScreenInformation(rol);

  const listOfItems =
    list.map((_item) => {
      return (
        <UserRequestContainer
          userName={_item.name}
          date={_item.date}
          key={_item.id}
          action={() => {}}
        />
      );
    }) || [];

  return (
    <div className=" flex min-h-[80vh] w-full min-w-32 flex-col items-center gap-3 overflow-y-auto px-4 font-Inter">
      <div className="flex w-11/12 flex-col gap-1 text-center">
        <h1 className=" text-xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-[0.75rem] font-light sm:text-base">{subTitle}</p>
      </div>
      <div className="flex w-full flex-col sm:w-3/4">
        <div className=" flex max-h-[63vh] flex-col gap-4">
          {rol === "ECG" || rol === "RST" ? (
            <div className="flex flex-col gap-1">
              <h2 className=" text-lg font-semibold text-royal-amethyst sm:text-3xl">
                Solicitudes pendientes
              </h2>
              <p className="text-[0.75rem] font-light sm:text-base">
                {subTitle2}
              </p>
            </div>
          ) : (
            <></>
          )}
          <RequestFilterBar rol={rol} />
          <div className=" flex h-full w-full flex-1 flex-col justify-start gap-2 overflow-y-auto sm:px-4">
            {listOfItems != null && listOfItems.length > 0
              ? listOfItems
              : "Cargando..."}
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row items-center justify-center gap-1 text-gray-600">
              <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
              <p>Ó</p>
              <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
            </div>
            <GeneralButton textDescription={"Crear invitación"} />
          </div>
        </div>
      </div>
    </div>
  );
}