import React from "react";
import LogoImage from "../../assets/images/logo.svg";
import { GoogleIcon } from "../../components/Icons";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto flex max-w-[475px] flex-col items-center gap-8 px-8 py-10 text-center text-black md:gap-10 lg:gap-12">
      <img
        src={LogoImage}
        alt="FlowHood"
        width={100}
        height={100}
        className=""
      />
      <p className="flex flex-col gap-2.5  text-[2.3125rem] font-bold leading-[1.8125rem] ">
        Bienvenido
        <span className="text-lg font-semibold leading-[normal] ">
          a tu sistema de control de acceso
        </span>
      </p>

      <p className="max-w-[34ch] text-lg font-light leading-[normal] ">
        Nuestro objetivo es brindarte la mejor experiencia y hacer que te
        sientas seguro en tu comunidad.
      </p>

      <p className="mt-5 text-lg font-medium leading-[11.209px]">
        Por favor, inicia sesión para continuar
      </p>

      <button className="flex h-[2.6875rem] w-full max-w-96 items-center justify-between rounded-full border-[0.467px] border-[#495865] bg-white p-2 pl-[1.375rem] pr-[6.75rem]">
        <GoogleIcon width={21} height={21} />
        <span className="font-['Roboto'] text-[.9375rem] font-medium leading-[normal] text-[#1f1f1f]">
          Sign in with Google
        </span>
      </button>

      <p className="text-base font-medium leading-[1.4375rem]">
        Antes de usar esta aplicación, puedes revisar los
        <Link to="/" className="text-[#4880ff]">
          {" "}
          polítcas de privacidad y términos de servicio.
        </Link>
      </p>
    </div>
  );
};

export default Login;
