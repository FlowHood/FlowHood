import React from "react";
import { capitalizeWords } from "../lib/utils";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { OPTIONS_ARRAY } from "../lib/const";

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
  time = "",
  to = "",
  address = "",
  status = "",
  isActive = false,
  hasPassed = true,
  qrAvailable = false,
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
    let dayNumber = newDate.date();
    return {
      dayNumber,
      day,
      month,
      year,
    };
  };

  let { dayNumber, day, month, year } = generateDateString(date);

  const ContainerElement = to === "#" ? "div" : "a";
  const containerProps = to === "#" ? {} : { href: to };

  return (
    <ContainerElement
      className={`relative flex h-[fit-content] w-full flex-row rounded-md border-2 border-black transition-all ${
        to !== "#" ? "hover:text-[#69b1ff]" : ""
      } ${hasPassed && !isActive && !qrAvailable ? "bg-gray-200" : ""}`}
      {...containerProps}
    >
      <div
        className={`w-[11px] rounded-bl-md rounded-tl-md border-r-2 border-black ${
          status === OPTIONS_ARRAY.NO_FILTER
            ? "bg-slate-700"
            : status === OPTIONS_ARRAY.ACCEPTED
              ? "bg-tanzanite"
              : status === OPTIONS_ARRAY.NOT_ACCEPTED
                ? "bg-red-500"
                : status === OPTIONS_ARRAY.TO_CHECK
                  ? "bg-orange-500"
                  : "bg-slate-700"
        } ${hasPassed && !isActive && !qrAvailable ? "opacity-35" : ""} sm:w-[17px]`}
      ></div>
      <div className="flex w-11/12 flex-col p-2">
        <p className=" w-2/4 text-[0.65rem] sm:w-auto sm:text-base">
          Solicitud de invitacion para {capitalizeWords(userName)}
        </p>
        <p className="self-end text-[0.6rem] sm:self-auto sm:text-base">
          <span className="font-bold">
            {day} {dayNumber}
          </span>
          , {month + " " + year} - {time}
        </p>
        <p className="mt-3 text-[0.65rem] text-gray-600 sm:text-base">
          Dirección: {address}
        </p>
        {isActive && status === OPTIONS_ARRAY.ACCEPTED && (
          <Tag
            icon={<CheckCircleOutlined />}
            color="success"
            className="absolute right-0 top-1 text-[0.5rem] md:top-2 md:text-base"
          >
            Activa
          </Tag>
        )}
        {hasPassed && !qrAvailable && (
          <Tag
            icon={<MinusCircleOutlined />}
            color="default"
            className="absolute right-0 top-1 text-[0.5rem] md:top-2 md:text-base"
          >
            Pasada
          </Tag>
        )}
        {qrAvailable && !isActive && status === OPTIONS_ARRAY.ACCEPTED && (
          <Tag
            icon={<QrcodeOutlined />}
            color="gold"
            className="absolute right-0 top-1 text-[0.5rem] md:top-2 md:text-base"
          >
            QR Disponible
          </Tag>
        )}
      </div>
    </ContainerElement>
  );
}
