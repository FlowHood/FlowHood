import { ROL } from "../../../lib/rol";
import FilterItem from "./FilterItem";

import React, { useState } from "react";

const OPTIONS = {
  NO_FILTER: 0,
  ACCEPTED: 1,
  NOT_ACCEPTED: 2,
  TO_CHECK: 3,
};

export default function RequestFilterBar(title = "", rol = ROL.RESIDENT) {
  //TODO: GET ROL
  const [currentSelected, setCurrentSelected] = useState(OPTIONS.NO_FILTER);

  const selectedChangeHandler = (toBeSelected) => {
    //TODO: do some logic
    setCurrentSelected(toBeSelected);
  };

  return (
    <div className=" flex flex-row items-center justify-center gap-3 sticky top-0 bg-white p-2">
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
      {rol === ROL.OWNER ? (
        <FilterItem
          text={"Verificar"}
          action={() => {
            selectedChangeHandler(OPTIONS.TO_CHECK);
          }}
          isSelected={currentSelected === OPTIONS.TO_CHECK}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
