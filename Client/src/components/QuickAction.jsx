import React from "react";
import ActionCard from "./cards/ActionCard";
import { PlusIcon, InvitationIcon, SimpleHouseIcon, StatsIcon, UserIcon } from "./Icons";
import SectionIntro from "./SectionIntro";
import { VIEWS } from "../lib/views";

const actions = [
  {
    title: "Agregar nueva casa",
    icon: <SimpleHouseIcon />,
    href: VIEWS.manageHouse.replace(":id", ""),
    className: "md:row-span-2 lg:row-auto",
  },
  {
    title: "Estadisticas",
    icon: <StatsIcon />,
    href: VIEWS.charts,
  },
  {
    title: "Administrar usuarios",
    icon: <UserIcon />,
    href: VIEWS.userList
  },

  {
    title: "Administrar entradas",
    icon: <InvitationIcon />,
    href: VIEWS.requestList,
    className: "md:col-span-2 lg:col-auto",
  },
];

const QuickAction = () => {
  return (
    <div>
      <SectionIntro title="Acciones rápidas" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            icon={action.icon}
            href={action.href}
            className={action.className}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAction;
