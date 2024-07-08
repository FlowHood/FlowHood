import React from "react";
import { GoogleIcon } from "../../components/Icons";

const GoogleLoginButton = ({ login }) => {
  return (
    <button
      onClick={() => login()}
      type="button"
      className="flex h-[2.6875rem] w-full max-w-96 items-center justify-between rounded-full border-[0.467px] border-[#495865] bg-white p-2 pl-[1.375rem] pr-[6.75rem] transition-all hover:bg-slate-100"
    >
      <GoogleIcon width={21} height={21} />
      <span className="text-[.9375rem] font-medium leading-[normal] text-[#1f1f1f]">
        Iniciar sesión con Google
      </span>
    </button>
  );
};

export default GoogleLoginButton;
