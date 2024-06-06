import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import codeQR from "../../assets/images/qr.svg";
import GeneralButton from "../../components/buttons/GeneralButton";
import { LogoInitialsIcon } from "../../components/Icons";

export default function UserScanQR() {
  let [isScanQR, setScanQr] = useState(false);

  const handleScan = (result) => {
    console.log({ result });
    if (result != null) setScanQr(!isScanQR);
    if (result != null) alert(result.text);
  };

  const handleError = (err) => {
    console.log({ err });
  };
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-10 sm:min-h-[70vh] sm:gap-16">
      <LogoInitialsIcon />
      <div className="relative flex flex-col items-center justify-center gap-8 font-Inter leading-[1.8125rem] sm:gap-9">
        <h1 className=" w-3/4 min-w-32 text-center text-3xl font-bold sm:w-2/3 sm:text-5xl">
          Escanear llave de entrada
        </h1>
      </div>
      <div className="relative flex max-h-48 w-full min-w-14 max-w-48 items-center justify-center border border-gray-500 p-3 sm:max-h-80 sm:max-w-80">
        <div className="absolute -right-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-l-0 border-black"></div>
        <div className="absolute -left-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-r-0 border-black"></div>
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-[3px] border-r-0 border-t-0 border-black"></div>
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-[3px] border-l-0 border-t-0 border-black"></div>
        {!isScanQR ? (
          <img
            src={codeQR}
            alt="QR code"
            className="w-full min-w-12 max-w-44 bg-cover sm:max-w-72"
          />
        ) : (
          <>
            <QrReader
              delay={100}
              onError={handleError}
              onScan={handleScan}
              style={{
                width: " w-full", //"w-full max-w-44 sm:max-w-72 md:max-w-96"
                height: "w-full", //"h-full max-h-44 sm:max-h-72 md:max-h-96"
              }}
              constraints={{
                audio: false,
                video: {
                  width: "w-full max-w-44 sm:max-w-72",
                  height: "h-full max-h-44 sm:max-h-72",
                  facingMode: "environment",
                },
              }}
            />
          </>
        )}
      </div>
      <GeneralButton
        textDescription={"Escanear código QR"}
        className="bg-white text-lg font-light text-black hover:bg-gray-200 sm:text-2xl"
        action={() => setScanQr(!isScanQR)}
      />
    </div>
  );
}
