import { FILTER_LABEL, OPTIONS } from "../../../lib/const";
import { ROL } from "../../../lib/rol";
import FilterItem from "./FilterItem";

import React, { useEffect, useState } from "react";

export default function RequestFilterBar({ title = "", handleChangeSelected, rol = ROL.RESIDENT }) {
  //TODO: GET ROL
  const [currentSelected, setCurrentSelected] = useState(OPTIONS.NO_FILTER);

  const selectedChangeHandler = (toBeSelected) => {
    //TODO: do some logic
    if (toBeSelected === currentSelected) {
      return;
    }
    setCurrentSelected(toBeSelected);
    console.log("Filtering by: ", FILTER_LABEL[toBeSelected]);
    handleChangeSelected(FILTER_LABEL[toBeSelected]);
  };

  return (

    <div className=" flex flex-row items-center justify-center gap-3 sticky top-0 bg-white p-2">
      <FilterItem
        text={"Pendiente"}
        action={() => {
          selectedChangeHandler(OPTIONS.TO_CHECK);
        }}
        isSelected={currentSelected === OPTIONS.TO_CHECK}
      />
      <FilterItem
        text={"Aceptadas"}
        action={() => {
          selectedChangeHandler(OPTIONS.ACCEPTED);
        }}
        isSelected={currentSelected === OPTIONS.ACCEPTED}
      />
      <FilterItem
        text={"Rechazadas"}
        action={() => {
          selectedChangeHandler(OPTIONS.NOT_ACCEPTED);
        }}
        isSelected={currentSelected === OPTIONS.NOT_ACCEPTED}
      />
      {/* {rol === ROL.OWNER ? (
        <FilterItem
          text={"Verificar"}
          action={() => {
            selectedChangeHandler(OPTIONS.TO_CHECK);
          }}
          isSelected={currentSelected === OPTIONS.TO_CHECK}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
}
