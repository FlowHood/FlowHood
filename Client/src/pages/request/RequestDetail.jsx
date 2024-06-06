import React from "react";
import { LogoInitialsIcon } from "../../components/Icons";
import SectionIntro from "../../components/SectionIntro";
import TitleComponent from "../../components/shared/TitleComponent";
import Button from "../../components/buttons/Button";
import UserLayout from "../../components/user/UserLayout";

const data = {
  nombre: "Helena Victoria Ríos García",
  visitante: "Laura Sofía Rodríguez Sánchez",
  residenteSolicitante: "Helena Victoria Ríos García",
  fechaVisita: "Lunes 25 de marzo del 2024",
  horarioVisita: "9:00 am - 13:00 pm",
  razonVisita: "Reunión de estudio y trabajo para colaboración en proyectos",
};

const RequestDetail = () => {
  return (
    <UserLayout showLogout={false}>
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <SectionIntro
          title={"Solicitud de visita de " + data.nombre}
          small
          generalClassName="!text-royal-amethyst max-w-[50ch]"
        />

        <div className="self-stretc flex w-full max-w-[24.875rem] flex-col justify-center gap-5 rounded-3xl border border-[#eff0f6] bg-[#f9f9f9] pb-[1.9375rem] pl-[1.9375rem] pr-[1.9375rem] pt-[1.9375rem]">
          <TitleComponent title="Visitante" data={data.visitante} />
          <TitleComponent
            title="Residente solicitante"
            data={data.residenteSolicitante}
          />
          <TitleComponent title="Fecha de visita" data={data.fechaVisita} />
          <TitleComponent title="Horario de visita" data={data.horarioVisita} />
          <TitleComponent title="Razón de visita" data={data.razonVisita} />
        </div>
        <div className="flex gap-8">
          <Button className="opacity-80">Rechazar</Button>
          <Button>Aceptar</Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default RequestDetail;
