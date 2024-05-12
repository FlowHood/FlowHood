import React from "react";
import { cn } from "../../lib/utils";

const LogoutButton = ({ action, className = "" }) => {
  return (
    <button
      type="button"
      onClick={action}
      className={cn(
        "w-fit items-center justify-center rounded-full bg-black px-[1.5625rem] py-[0.5625rem] text-[.8125rem] font-semibold text-white",
        className,
      )}
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
