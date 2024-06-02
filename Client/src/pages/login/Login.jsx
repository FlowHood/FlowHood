import React, { useEffect, useState } from "react";
import LogoImage from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { loginUserToGoogle } from "../../services/auth.service";

const Login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const loginAction = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.length !== 0) {
      loginUserToGoogle(user).then((res) => {
        setProfile(res);
      });
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className="mx-auto flex max-w-[475px] flex-col items-center gap-8 px-8 py-10 text-center text-black md:gap-10 lg:gap-12">
      
      {/* Remove all this  */}
      Profile:
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      User:
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {profile !== null ? (
        <div className="profile-details">
          <img src={profile.picture} alt="" />
          <div className="profile-content">
            <h3>{profile.name}</h3>
            <h5>{profile.email}</h5>
          </div>
          <button className="profile-button" onClick={logOut}>
            Logout
          </button>
        </div>
      ) : null}
      {/* Remove all this  */}

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
      <GoogleLoginButton login={loginAction} />
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
