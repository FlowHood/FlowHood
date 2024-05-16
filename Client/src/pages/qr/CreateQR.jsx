import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import { Link } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton";

//Icons
import { MdArrowBackIos } from "react-icons/md";
import codeQR from "../../assets/images/ex_qr.jpg";

export default function CreateQR() {
  //TODO: handle qr code generation
  let isQr = true;
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-start px-8 py-10 text-black sm:gap-20 md:gap-10 lg:gap-12">
        <Link to="/security-home" className=" min-h-[2vh] self-start">
          <MdArrowBackIos />
        </Link>

        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-10 sm:gap-16">
          <div className="relative flex flex-col items-center justify-center gap-8 font-Inter leading-[1.8125rem] sm:gap-9">
            <h1 className=" w-3/4 min-w-44 text-center text-4xl font-bold">
              Generar llave de entrada
            </h1>
            <p className=" w-3/4 min-w-44 text-center font-light leading-6">
              Tu llave QR tienen una duración de 10 minutos, luego de que expiré
              el tiempo tendrás que generarlo de nuevo
            </p>
          </div>
          <div className="relative max-h-80 min-h-40 min-w-40 max-w-80 border border-gray-500 p-3">
            <div className="absolute -right-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-l-0 border-black"></div>
            <div className="absolute -left-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-r-0 border-black"></div>
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-[3px] border-r-0 border-t-0 border-black"></div>
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-[3px] border-l-0 border-t-0 border-black"></div>
            {isQr ? (
              <img
                src={codeQR}
                alt="QR code"
                className="min-h-28 min-w-28 max-w-40 "
              />
            ) : (
              <></>
            )}
          </div>
          <GeneralButton textDescription={"Generar llave QR"} />
        </div>
      </div>
      <NavigationBar className="fixed bottom-0" />
    </main>
  );
}
