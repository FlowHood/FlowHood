import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div
        className="inline-block size-28 animate-spin rounded-full border-[0.8rem] border-solid border-gray-300 border-r-[#0e6efa] motion-reduce:animate-[spin_1.5s_linear_infinite] "
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export const LoadingComponent = () => {
  return (
    <div
      className="inline-block size-14 animate-spin rounded-full border-[0.4rem] border-solid border-gray-300 border-r-[#0e6efa] motion-reduce:animate-[spin_1.5s_linear_infinite] "
      role="status"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default Loading;
