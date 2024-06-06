import React from "react";
import { ROL, getRol } from "../../lib/rol";
import DateFilterBar from "./filterBar/DateFilterBar";
import UserEntriesContainer from "../UserEntriesContainer";

// Data

const list = [
  { id: "1", name: "Henry Lima", date: "2024/07/12" },
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

const getScreenInformation = () => {
  return {
    title: "Registros de entrada",
    subTitle: "Aquí podrás ver todas las entradas registradas por los residentes de tu hogar",
  };
};

export default function EntriesHistoryContainer() {
//obtener rol 
  const userRol = getRol("ECG"); // Esto debería ser dinámico

  if (userRol !== ROL.OWNER) {
    return <div>No tienes permiso para ver esta página.</div>;
  }

  const { title, subTitle } = getScreenInformation();

  const listOfItems = list.map((item) => (
    <UserEntriesContainer
      userName={item.name}
      date={item.date}
      key={item.id}
      action={() => {}}
    />
  ));

  return (
    <div className="flex min-h-[80vh] w-full min-w-32 flex-col items-center gap-3 overflow-y-auto px-4 font-Inter">
      <div className="flex w-11/12 flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-[0.75rem] font-light sm:text-base">{subTitle}</p>
      </div>
      <div className="flex w-full flex-col sm:w-3/4">
        <DateFilterBar rol={userRol} />
        <div className="flex h-full w-full flex-1 flex-col justify-start gap-2 overflow-y-auto sm:px-4">
          {listOfItems.length > 0 ? listOfItems : "Cargando..."}
        </div>
      </div>
    </div>
  );
}