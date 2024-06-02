import React from "react";

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
