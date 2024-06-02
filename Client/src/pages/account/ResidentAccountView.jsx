import React from "react";
import { FaCog, FaUser, FaFolderOpen, FaSignOutAlt, FaHome, FaCalendarAlt } from "react-icons/fa";
import SectionIntro from "../../components/SectionIntro";
import { Container } from "../../components/Container";
import { Link } from "react-router-dom";

let UserROL = "VST"; //ADM administrador, VST visitante, VGT vigilante, RST residente, ECG encargado
const getOptionsByRole = (role) => {
  const commonOptions = [
    { icon: FaUser, text: "Información Personal", to: "/informacion-personal" },
    { icon: FaFolderOpen, text: "Contacto con administrador", to: "/contacto-administrador" },
  ];

  const roleSpecificOptions = {
    ECG: [
      { icon: FaCalendarAlt, text: "Registros de entrada", to: "/registros-entrada" },
      { icon: FaHome, text: "Administrar hogar", to: "/administrar-hogar" },
    ],
    VST: [
      { icon: FaFolderOpen, text: "Tus invitaciones", to: "/tus-invitaciones" },
    ],
  };

  const options = commonOptions.concat(roleSpecificOptions[role] || []);
  options.push({ icon: FaSignOutAlt, text: "Cerrar sesión", to: "/" });

  return options;
};

const ResidentAccountView = () => {
  const options = getOptionsByRole(UserROL);

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center pb-8">
      <SectionIntro
        title="Tu cuenta"
        subtitle="Administra tu cuenta y ten control de tu app."
        generalClassName="text-center max-w-[27ch]"
      />

      <div className="relative mt-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
          className="h-40 w-40 rounded-full border-4 border-tanzanite object-cover shadow-card"
        />
        <button className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-tanzanite p-2 text-white shadow-card">
          <FaCog size={20} />
        </button>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-royal-amethyst">
        Martín López
      </h2>
      <p className="mt-2 font-Inter text-lg text-black">Familia López</p>
      <p className="mt-1 text-sm text-light-gray">
        Residencial HLVS, calle principal, pasaje 25, casa #24
      </p>

      <div className="mt-4 w-full px-8">
        <SectionIntro title="Ajustes generales" titleClassName="!text-xl" />
        <ul className="leading-[2rem] text-[#495865]">
          {options.map((option, index) => (
            <li key={index}>
              <Link to={option.to} className="flex items-center gap-4">
                <option.icon size={20} className="mr-2" />
                <span className="leading-[2rem] hover:text-[#323f4b]">
                  {option.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ResidentAccountView;
