import React, { useState } from "react";
import SectionIntro from "../../components/SectionIntro";
import TitleComponent from "../../components/shared/TitleComponent";
import Button from "../../components/buttons/Button";
import Loading from "../../components/Loading";
import { updateStatusRequest } from "../../services/request.service";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { ROL } from "../../lib/rol";
import { OPTIONS_ARRAY } from "../../lib/const";
import { capitalizeWords } from "../../lib/utils";

const RequestDetailInModal = ({ request, onClose }) => {
  const { roles } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const now = moment();
  const startDate = moment(
    `${request.startDate.split("T")[0]} ${request.startTime}`,
  );
  const endDate = moment(`${request.endDate.split("T")[0]} ${request.endTime}`);

  const qrStartTime = startDate.clone().subtract(30, "minutes");
  const qrEndTime = endDate.clone().add(30, "minutes");

  const isQrAvailable = now.isBetween(qrStartTime, qrEndTime);
  const timeUntilQrValid = qrStartTime.diff(now, "minutes");
  const timeLeftToScan = qrEndTime.diff(now, "minutes");

  let qrMessage;
  if (isQrAvailable) {
    qrMessage =
      timeLeftToScan > 0
        ? `Tiempo restante para escanear el QR: ${timeLeftToScan} minutos`
        : "El tiempo para escanear el QR ha pasado";
  } else {
    qrMessage =
      timeUntilQrValid > 0
        ? `El QR será válido en: ${timeUntilQrValid} minutos`
        : "El tiempo para escanear el QR ha pasado";
  }

  console.log("request", request);

  const data = {
    nombre: request.resident.name,
    visitante: request.visitor.name,
    residenteSolicitante: request.resident.name,
    fechaVisita: moment(request.startDate).format(
      "dddd DD [de] MMMM [del] YYYY",
    ),
    horarioVisita: `${moment(request.startDate).format("dddd DD [de] MMMM [del] YYYY")} - ${request.startTime}`,
    horarioSalida: `${moment(request.endDate).format("dddd DD [de] MMMM [del] YYYY")} - ${request.endTime}`,
    razonVisita: request.reason,
  };

  const handleChangeStatus = async (status) => {
    setIsLoading(true);
    console.log("handleChangeStatus called with status:", status);
    await updateStatusRequest(request.id, status);
    // setRequest({ ...request, status });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 py-8 text-center">
      <SectionIntro
        title={
          roles.includes(ROL.VISITOR)
            ? "Solicitud de visita"
            : "Detalle de solicitud de " + capitalizeWords(data.visitante)
        }
        small
        generalClassName="!text-royal-amethyst max-w-[50ch]"
      />
      <div className="mx-auto flex w-full max-w-[32.875rem] flex-col justify-center gap-5 self-stretch rounded-3xl border border-[#eff0f6] bg-[#f9f9f9] pb-[1.9375rem] pl-[1.9375rem] pr-[1.9375rem] pt-[1.9375rem]">
        <TitleComponent title="Visitante" data={data.visitante} />
        <TitleComponent title="Estado" data={capitalizeWords(request.status)} />
        <TitleComponent title="QR Información" data={qrMessage} />
        <TitleComponent
          title="Residente solicitante"
          data={data.residenteSolicitante}
        />
        <TitleComponent title="Fecha de visita" data={data.fechaVisita} />
        <TitleComponent title="Horario de visita" data={data.horarioVisita} />
        <TitleComponent title="Horario de salida" data={data.horarioSalida} />
        <TitleComponent title="Razón de visita" data={data.razonVisita} />
      </div>
      {(roles.includes(ROL.OWNER) || roles.includes(ROL.ADMIN)) &&
      timeLeftToScan > 0 &&
      !(request.status === OPTIONS_ARRAY.USED) ? (
        <div className="flex gap-8">
          <Button
            action={() => handleChangeStatus(OPTIONS_ARRAY.NOT_ACCEPTED)}
            className="opacity-80"
          >
            Rechazar
          </Button>
          <Button action={() => handleChangeStatus(OPTIONS_ARRAY.ACCEPTED)}>
            Aceptar
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RequestDetailInModal;
