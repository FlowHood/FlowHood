import React from "react";
import ActionCard from "./cards/ActionCard";
import { PlusIcon, InvitationIcon, SimpleHouseIcon } from "./Icons";
import SectionIntro from "./SectionIntro";

const actions = [
  {
    title: "Agregar nuevo usuario",
    icon: <PlusIcon />,
    href: "/add-user",
  },
  {
    title: "Crear nueva invitación",
    icon: <InvitationIcon />,
    href: "/create-invitation",
  },
  {
    title: "Agregar nueva casa",
    icon: <SimpleHouseIcon />,
    href: "/add-house",
    className: "md:row-span-2 lg:row-auto",
  },
  {
    title: "Agregar ",
    icon: <PlusIcon />,
    href: "/",
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
