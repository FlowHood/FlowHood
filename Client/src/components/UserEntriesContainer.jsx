import moment from "moment";
import React from "react";
import { ClockIcon } from "./Icons";

moment.locale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_",
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

export default function UserRequestContainer({
  userName = "",
  date = "",
  action,
}) {
  const generateDateString = (date) => {
    let newDate = moment(date);
    let today = moment();
    let day;
    switch (newDate) {
      case today:
        day = "Hoy";
        break;

      case moment(today).date(today.date() - 1):
        day = "Ayer";
        break;
      default:
        day = newDate.format("dddd");
        break;
    }
    let year = newDate.year();
    let month = newDate.format("MMMM");
    return {
      day,
      month,
      year,
    };
  };

  let { day, month, year } = generateDateString(date);
  return (
    <div
      className="flex w-full flex-row rounded-md border-2 border-black"
      onClick={action}
    >
      <div className="flex w-11/12 flex-col p-2">
        <div className="flex items-center">
          <ClockIcon className="text-sm p-2" />
          <p className="w-2/4 text-[0.65rem] sm:w-auto sm:text-base">
            Entrada Registrada de {userName}
          </p>
        </div>
        <p className="self-end text-[0.6rem] sm:self-auto sm:text-base">
          <span className="font-bold">{day}</span>, {month} {year}
        </p>
      </div>
    </div>
  )
}
