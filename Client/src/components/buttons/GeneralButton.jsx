import React from "react";
import { cn } from "../../lib/utils";

const GeneralButton = ({
  action,
  className = "",
  textDescription,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={action}
      className={cn(
        "w-fit items-center justify-center rounded-full bg-black px-[1.5625rem] py-[0.5625rem] text-[.8125rem] font-semibold text-white hover:bg-royal-amethyst",
        className,
      )}
      {...props}
    >
      {textDescription}
    </button>
  );
};

export default GeneralButton;
