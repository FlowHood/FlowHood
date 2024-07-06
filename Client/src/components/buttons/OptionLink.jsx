import React from "react";
import { Link } from "react-router-dom";

const OptionLink = ({ to, texto, Icono }) => {
  return (
    <Link
      to={to}
      className="flex min-h-[11.1875rem] flex-shrink-0 flex-col justify-between rounded-xl bg-[#5d5eef] p-3 text-[#f2f1ff] transition-all hover:bg-[#c7c7f8] hover:text-black"
    >
      <Icono
        className="duration-200 transition-all"
        width={80}
        height={80}
      />
      <span className="ml-auto max-w-[11ch] p-2 text-[1.0625rem] font-semibold">
        {texto}
      </span>
    </Link>
  );
};

export default OptionLink;
