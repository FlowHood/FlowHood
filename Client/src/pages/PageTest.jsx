import React from "react";
import { LogoInitialsIcon } from "../components/Icons";
import Button from "../components/buttons/Button";
import SectionIntro from "../components/SectionIntro";

const data = {
  name: "Helena Victoria Ríos García",
  entry_date: "Lunes 25 de marzo del 2024",
  entry_time: "10:00 am",
};

const PageTest = () => {
  return (
    <div className="mt-14 flex flex-col items-center gap-2 text-center lg:mt-0">
      <LogoInitialsIcon />
      <SectionIntro title="Registro de Entrada" small />

      <div className="self-stretc flex w-full max-w-[24.875rem] flex-col justify-center gap-5 rounded-3xl border border-[#eff0f6] bg-[#f9f9f9] pb-[1.9375rem] pl-[1.9375rem] pr-[1.9375rem] pt-[1.9375rem]">
        <TitleComponent title="Residente" data={data.name} />
        <TitleComponent title="Fecha de entrada" data={data.entry_date} />
        <TitleComponent title="Hora de entrada" data={data.entry_time} />
      </div>
      <Button className="mt-5">Aceptar entrada</Button>
    </div>
  );
};

export const TitleComponent = ({ title, data }) => {
  return (
    <div className=" flex flex-col items-start text-[#495865]">
      <p className="text-[1.0625rem] font-semibold uppercase leading-[1.6875rem] ">
        {title}
      </p>
      <p className="text-[1.0625rem] font-normal uppercase leading-[1.6875rem]">
        {data}
      </p>
    </div>
  );
};

export default PageTest;
