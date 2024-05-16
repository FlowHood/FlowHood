import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const ActionCard = ({ href, title, icon, className = "" }) => {
  return (
    <Link
      to={href}
      className={cn(
        className,
        "shadow-card flex flex-col items-center justify-center rounded-xl bg-white p-[1.375rem]",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-full bg-[#f2f1ff] p-3.5">
          {icon}
        </div>
        <p className="font-['Inter'] font-medium leading-[1.1875rem] text-black">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default ActionCard;
