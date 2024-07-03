import React from "react";
import {
  FaCog,
  FaUser,
  FaFolderOpen,
  FaSignOutAlt,
  FaHome,
  FaCalendarAlt,
} from "react-icons/fa";
import SectionIntro from "../../components/SectionIntro";
import { Container } from "../../components/Container";
import { Link } from "react-router-dom";
import { getHighestPriorityRole, getRoleDescription } from "../../lib/rol";
import { useAuth } from "../../context/AuthContext";
import Avatar from "antd/es/avatar/avatar";
import { Tag } from "antd";
import { capitalizeWords } from "../../lib/utils";

const getOptionsByRole = (role) => {
  const commonOptions = [
    { icon: FaUser, text: "Información Personal", to: "/informacion-personal" },
    {
      icon: FaFolderOpen,
      text: "Contacto con administrador",
      to: "/contacto-administrador",
    },
  ];

  const roleSpecificOptions = {
    ECG: [
      {
        icon: FaCalendarAlt,
        text: "Registros de entrada",
        to: "/registros-entrada",
      },
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

const HouseCard = ({ house, title }) => (
  <div className="w-full max-w-md rounded-md border bg-white p-4 shadow-md">
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <div className="flex items-center justify-between gap-4">
      <p>
        <strong>Dirección:</strong> {house.address}
      </p>
      <Tag color={house.active ? "green" : "red"}>
        {house.active ? "Activa" : "Inactiva"}
      </Tag>
    </div>
    <div className="flex items-center gap-3">
      <p>
        <strong>Responsable:</strong> {capitalizeWords(house.responsible.name)}
      </p>
      <Avatar src={house.responsible.picture} alt={house.responsible.name} />
    </div>
    <div className="flex items-center gap-3">
      <p>
        <strong>Residentes:</strong>
      </p>

      <Avatar.Group max={5}>
        {house.residents.map((resident) => (
          <Avatar
            key={resident.id}
            src={resident.picture}
            alt={resident.name}
          />
        ))}
      </Avatar.Group>
    </div>
  </div>
);

const ResidentAccountView = () => {
  const { user, roles, logout } = useAuth();

  const highestRole = getHighestPriorityRole(roles);
  const roleDescription = getRoleDescription(highestRole);
  const options = getOptionsByRole(highestRole);

  const hasHouses = user.houses.length > 0;
  const hasAdmHouses = user.admHouses.length > 0;

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center pb-8">
      <SectionIntro
        title="Tu cuenta"
        subtitle="Administra tu cuenta y ten control de tu app."
        generalClassName="text-center max-w-[27ch]"
      />

      <div className="relative mt-6">
        <img
          src={user.picture}
          alt="Foto de perfil"
          className="h-40 w-40 rounded-full border-4 border-tanzanite object-cover shadow-card"
        />
      </div>

      <h2 className="mt-4 text-xl font-semibold text-royal-amethyst">
        {user.name} {user.lastname}
      </h2>
      <p className="mt-2 font-Inter text-lg text-black">{roleDescription}</p>

      <div className="mt-4 w-full px-8">
        {hasHouses || hasAdmHouses ? (
          <div
            className={`grid justify-items-center gap-4 ${hasAdmHouses && hasHouses ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
          >
            {hasHouses && (
              <HouseCard
                house={user.houses[0]}
                title="Casa(s) como residente"
              />
            )}
            {hasAdmHouses && (
              <HouseCard
                house={user.admHouses[0]}
                title="Casa(s) como administrador"
              />
            )}
          </div>
        ) : (
          <p>No tiene casas asociadas.</p>
        )}
      </div>

      <div className="mx-auto mt-4 w-full max-w-[400px] px-8">
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
