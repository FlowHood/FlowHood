import React from "react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      onClick={logout} // Cambiado para pasar la función en lugar de ejecutarla
      className={cn(
        "w-fit items-center justify-center rounded-full bg-black px-[1.5625rem] py-[0.5625rem] text-xs font-semibold text-white md:text-[.8125rem]",
        className,
      )}
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
