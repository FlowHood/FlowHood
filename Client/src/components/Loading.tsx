import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex w-full items-center justify-center">
      <div
        className="inline-block size-28 animate-spin rounded-full border-[0.8rem] border-gray-300 border-solid border-r-[#0e6efa] motion-reduce:animate-[spin_1.5s_linear_infinite] "
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export default Loading;