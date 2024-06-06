import React, { useState } from "react";
import { ROL } from "../../lib/rol";
import FilterItem from "./FilterItem";


const OPTIONS = {
  NO_FILTER: 0,
  TODAY: 1,
  WEEK: 2,
  MONTH: 3,
};

export default function DateFilterBar({
  rol,
  onToday = () => {},
  onWeek = () => {},
  onMonth = () => {},
}) {
  const [currentSelected, setCurrentSelected] = useState(OPTIONS.NO_FILTER);

  const selectedChangeHandler = (toBeSelected) => {
    setCurrentSelected(toBeSelected);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <FilterItem
        text={"Hoy"}
        action={() => {
          selectedChangeHandler(OPTIONS.TODAY);
          onToday();
        }}
        isSelected={currentSelected === OPTIONS.TODAY}
      />
      <FilterItem
        text={"Semana"}
        action={() => {
          selectedChangeHandler(OPTIONS.WEEK);
          onWeek();
        }}
        isSelected={currentSelected === OPTIONS.WEEK}
      />
      {rol === ROL.OWNER && (
        <FilterItem
          text={"Mes"}
          action={() => {
            selectedChangeHandler(OPTIONS.MONTH);
            onMonth();
          }}
          isSelected={currentSelected === OPTIONS.MONTH}
        />
      )}
    </div>
  );
}
/*
const OPTIONS = {
  NO_FILTER: 0,
  TODAY: 1,
  WEEK: 2,
  MONTH: 3,
};

 export default function DateFilterBar({
  title = "",
  onToday = () => {},
  onWeek = () => {},
  onMonth = () => {},
}) {
  //TODO: GET ROL
  const [currentSelected, setCurrentSelected] = useState(OPTIONS.NO_FILTER);

  const selectedChangeHandler = (toBeSelected) => {
    //TODO: do some logic
    setCurrentSelected(toBeSelected);
  };

  return (
    <div className=" flex flex-row items-center justify-center gap-3">
      <FilterItem
        text={"Hoy"}
        action={() => {
          selectedChangeHandler(OPTIONS.TODAY);
          onToday();
        }}
        isSelected={currentSelected === OPTIONS.TODAY}
      />
      <FilterItem
        text={"Semana"}
        action={() => {
          selectedChangeHandler(OPTIONS.WEEK);
          onWeek();
        }}
        MONTH
        isSelected={currentSelected === OPTIONS.WEEK}
      />
      MONTH{" "}
      {rol === ROL.OWNER ? (
        <FilterItem
          text={"Mes"}
          action={() => {
            selectedChangeHandler(OPTIONS.TO_CHECK);
            onMonth();
          }}
          isSelected={currentSelected === OPTIONS.TO_CHECK}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
 */