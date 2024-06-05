import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

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
  to = "",
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
    <Link
      className="flex w-full flex-row rounded-md border-2 border-black"
      to={to}
    >
      <div className="w-[6%] rounded-bl-md rounded-tl-md border-r-2 border-black bg-tanzanite sm:w-[4%]"></div>
      <div className="flex w-11/12 flex-col p-2">
        <p className=" w-2/4 text-[0.65rem] sm:w-auto sm:text-base">
          Solicitud de invitacion para {userName}
        </p>
        <p className="self-end text-[0.6rem] sm:self-auto sm:text-base">
          <span className="font-bold">{day}</span>, {month + " " + year}
        </p>
      </div>
    </Link>
  );
}
