import React from "react";
import { cn } from "../../lib/utils";

const Button = ({
  as: Component = "button",
  action = () => {},
  to = "",
  className = "",
  children,
  props,
}) => {
  const buttonProps =
    Component === "button" ? { type: "button", onClick: action } : { to };
    
  return (
    <Component
      className={cn(
        "w-fit items-center justify-center rounded-full bg-black px-[1.5625rem] py-[0.5625rem] text-base font-semibold text-white transition-all hover:bg-[#3335fb] md:text-[.8125rem]",
        className,
      )}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
