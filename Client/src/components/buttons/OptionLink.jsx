import React from "react";
import { Link } from "react-router-dom";

const OptionLink = ({ to, texto, Icono }) => {
  return (
    <Link
      to={to}
      className="flex min-h-[11.1875rem] flex-shrink-0 flex-col justify-between rounded-xl bg-[#5d5eef] p-3"
    >
      <Icono width={80} height={80} />
      <span className="max-w-[11ch] ml-auto p-2 text-[1.0625rem] font-semibold text-[#f2f1ff]">
        {texto}
      </span>
    </Link>
  );
};

export default OptionLink;
