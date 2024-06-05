import React, { useEffect } from "react";
import LogoImage from "../../assets/images/logo.svg";
import { Link,useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigateTo("/");
    }
  } , [isAuthenticated, navigateTo]);

  return (
    <div className="mx-auto flex max-w-[475px] flex-col items-center gap-8 px-8 py-10 text-center text-black md:gap-10 lg:gap-12">
      User:
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {!isAuthenticated() ? (
        <button onClick={login}>Login with Google</button>
      ) : (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
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
      <GoogleLoginButton login={login} />
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
