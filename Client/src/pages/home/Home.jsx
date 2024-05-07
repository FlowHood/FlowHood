import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-800 flex min-h-screen flex-1 items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 max-w-[300px] w-full">
        <Link
          to="/login"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Si ven esto en azul, funciona react-router y tailwind en react.js jajsjs
        </Link>
      </div>
    </div>
  );
};

export default Home;
