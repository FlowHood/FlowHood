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
import {
  getHighestPriorityRole,
  getRoleDescription,
  getRolesDescription,
} from "../../lib/rol";
import { useAuth } from "../../context/AuthContext";
import Avatar from "antd/es/avatar/avatar";
import { Tag } from "antd";
import { capitalizeWords } from "../../lib/utils";
import { VIEWS } from "../../lib/views";

const getOptionsByRole = (role, logout) => {
  const commonOptions = [
    {
      icon: FaFolderOpen,
      text: "Contacto con administrador",
      to:  "mailto:galactic.studio23@gmail.com",
    },
  ];

  const roleSpecificOptions = {
    ECG: [
      {
        icon: FaCalendarAlt,
        text: "Registros de entrada",
        to: VIEWS.request
      },
      // { icon: FaHome, text: "Administrar hogar", to: VIEWS.houseList},
    ],
    VST: [
      { icon: FaFolderOpen, text: "Tus invitaciones", to: VIEWS.request },
    ],
  };

  const options = commonOptions.concat(roleSpecificOptions[role] || []);
  options.push({ icon: FaSignOutAlt, text: "Cerrar sesión", action: logout });

  return options;
};

export const HouseCard = ({ house, title }) => (
  <div className="w-full rounded-md border bg-white p-4 shadow-md">
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <div className="flex items-center justify-between gap-4">
      <p>
        <strong>Dirección:</strong> {house.address}
      </p>
      <Tag color={house.active ? "green" : "red"}>
        {house.active ? "Activa" : "Inactiva"}
      </Tag>
    </div>
    {house.responsible && (
    <div className="flex items-center gap-3">
      <p>
        <strong>Responsable:</strong> {capitalizeWords(house.responsible.name)}
      </p>
      <Avatar src={house.responsible.picture} alt={house.responsible.name} />
    </div>
    )}
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
  const rolesDescription = getRolesDescription(roles);
  const options = getOptionsByRole(highestRole, logout); 

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
      <p className="mt-2 font-Inter text-lg text-black">
        {rolesDescription.join(", ")}
      </p>

      <div className="mt-4 w-full px-8">
        {hasHouses || hasAdmHouses ? (
          <div
            className={`grid justify-items-center gap-4 ${hasAdmHouses && hasHouses ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
          >
            {hasHouses &&
              user.houses.map((house) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  title="Casa(s) como residente"
                />
              ))}
            {hasAdmHouses &&
              user.admHouses.map((house) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  title="Casa(s) como encargado"
                />
              ))}
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
              {option.action ? (
                <button
                  onClick={option.action}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <option.icon size={20} className="mr-2" />
                  <span className="leading-[2rem] hover:text-[#323f4b]">
                    {option.text}
                  </span>
                </button>
              ) : (
                <Link to={option.to} className="flex items-center gap-4">
                  <option.icon size={20} className="mr-2" />
                  <span className="leading-[2rem] hover:text-[#323f4b]">
                    {option.text}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ResidentAccountView;
