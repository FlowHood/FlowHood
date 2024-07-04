import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionIntro from "../../components/SectionIntro";
import TitleComponent from "../../components/shared/TitleComponent";
import Button from "../../components/buttons/Button";
import UserLayout from "../../components/user/UserLayout";
import Loading from "../../components/Loading";
import {
  getAllRequestsByVisitor,
  getRequestById,
  updateStatusRequest,
} from "../../services/request.service";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { ROL } from "../../lib/rol";
import { OPTIONS_ARRAY } from "../../lib/const";
import { capitalizeWords } from "../../lib/utils";

const RequestDetail = () => {
  const { id } = useParams();
  const { roles } = useAuth();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUniqueRolVisitor =
    roles.length === 1 && roles.every((rol) => rol.id === ROL.VISITOR);

  useEffect(() => {
    const fetchRequest = async () => {
      if (isUniqueRolVisitor) {
        const result = await getAllRequestsByVisitor();
        const request = result.find((req) => req.id === id);
        setRequest(request);
        setIsLoading(false);
        return;
      }

      const result = await getRequestById(id);
      setRequest(result);
      setIsLoading(false);
    };

    fetchRequest();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!request) {
    return (
      <UserLayout showLogout={false}>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <SectionIntro
            title="Solicitud no encontrada"
            small
            generalClassName="!text-royal-amethyst max-w-[50ch]"
          />
        </div>
      </UserLayout>
    );
  }

  const data = {
    nombre: request.resident.name,
    visitante: request.visitor.name,
    residenteSolicitante: request.resident.name,
    fechaVisita: moment(request.startDate).format(
      "dddd DD [de] MMMM [del] YYYY",
    ),
    horarioVisita: `${request.startTime} - ${request.endTime}`,
    razonVisita: request.reason,
  };

  const handleChangeStatus = async (status) => {
    console.log("handleChangeStatus called with status:", status);
    await updateStatusRequest(id, status);
    setRequest({ ...request, status });
  };

  return (
    <UserLayout showLogout={false}>
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <SectionIntro
          title={"Solicitud de visita de " + capitalizeWords(data.nombre)}
          small
          generalClassName="!text-royal-amethyst max-w-[50ch]"
        />
        <div className="mx-auto flex w-full max-w-[32.875rem] flex-col justify-center gap-5 self-stretch rounded-3xl border border-[#eff0f6] bg-[#f9f9f9] pb-[1.9375rem] pl-[1.9375rem] pr-[1.9375rem] pt-[1.9375rem]">
          <TitleComponent title="Visitante" data={data.visitante} />
          <TitleComponent
            title="Estado"
            data={capitalizeWords(request.status)}
          />
          <TitleComponent
            title="Residente solicitante"
            data={data.residenteSolicitante}
          />
          <TitleComponent title="Fecha de visita" data={data.fechaVisita} />
          <TitleComponent title="Horario de visita" data={data.horarioVisita} />
          <TitleComponent title="Razón de visita" data={data.razonVisita} />
        </div>
        {roles.includes(ROL.OWNER) || roles.includes(ROL.ADMIN) ? (
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
        {}
      </div>
    </UserLayout>
  );
};

export default RequestDetail;
