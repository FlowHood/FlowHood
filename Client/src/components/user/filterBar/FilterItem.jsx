import React from "react";

export default function FilterItem({
  isSelected,
  text,
  action,
  className = "",
}) {
  return (
    <button
      className={` rounded-md px-2 py-1 text-[0.6rem] sm:text-base ${className} ${isSelected ? "bg-gray-200" : "font-medium"}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
