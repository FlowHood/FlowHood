import React, { useState } from "react";
import GeneralButton from "../buttons/GeneralButton";
import codeQR from "../../assets/images/ex_qr.jpg";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../../context/AuthContext";
import { Form, Select } from "antd";
import VisitorRequestInfo from "./VisitorRequestInfo";
import moment from "moment";
import { generateQRRequest } from "../../services/request.service";
import { toast } from "sonner";
import LogoImage from "../../assets/images/logo_letras.svg";

const { Option } = Select;

export default function UserCreateQR({ qrInformation = "" }) {
  const { user } = useAuth();
  const [qrData, setQrData] = useState(qrInformation);
  const [selectedActiveRequest, setSelectedActiveRequest] = useState(null);
  const [isQrGenerated, setIsQrGenerated] = useState(false); // Nuevo estado para controlar el desenfoque
  const now = moment();
  const houses = user.houses.concat(user.admHouses);
  const myhouses = houses.filter(
    (house, index, self) => index === self.findIndex((t) => t.id === house.id),
  );

  const generateQR = async () => {
    try {
      if (!selectedActiveRequest) {
        toast.error("No hay solicitudes disponibles");
        return;
      }
      const data = await generateQRRequest(selectedActiveRequest?.id);
      setQrData(data);
      setIsQrGenerated(true);
      toast.success("QR generado correctamente");
    } catch (error) {
      console.error("Error generating QR:", error);
    }
  };

  console.log("selectedActiveRequest", selectedActiveRequest?.id);

  return (
    <div className="flex flex-col items-center justify-start p-4 pb-8 pt-0 text-black sm:gap-20 md:gap-10 lg:gap-12">
      <div className="flex w-full flex-col-reverse items-center justify-center lg:flex-row lg:justify-around lg:gap-10">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative flex flex-col items-center justify-center gap-8 font-Inter leading-[1.8125rem] sm:gap-9">
            <h1 className=" w-3/4 min-w-44 text-center text-[2rem] font-bold sm:text-4xl">
              Generar llave de entrada
            </h1>
            <p className=" w-3/4 min-w-44 text-center text-[0.85rem] font-light leading-5 sm:text-base">
              Tu llave QR tiene una duración de 10 minutos, luego de que expire
              el tiempo tendrás que generarla de nuevo.
            </p>
          </div>

          <div className="relative my-10 max-h-80 min-h-40 min-w-40 max-w-80 border border-gray-500 p-3">
            <div className="absolute -right-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-l-0 border-black"></div>
            <div className="absolute -left-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-r-0 border-black"></div>
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-[3px] border-r-0 border-t-0 border-black"></div>
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-[3px] border-l-0 border-t-0 border-black"></div>
            {qrData === "" ? (
              <img
                src={codeQR}
                alt="QR code"
                className={`min-h-28 min-w-28 max-w-40 ${isQrGenerated ? "fade-out" : "blurred"}`}
              />
            ) : (
              <QRCodeSVG
                value={qrData}
                size={270} // Tamaño del QR
                bgColor="#ffffff" // Color de fondo
                fgColor="#000000" // Color del QR
                level="Q" // Nivel de corrección de errores
                imageSettings={{
                  // Logo
                  src: LogoImage,
                  x: null,
                  y: null,
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
                className={isQrGenerated ? "fade-out" : "blurred"}
              />
            )}
          </div>
          <GeneralButton
            textDescription={"Generar llave QR"}
            action={generateQR}
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-8 pb-8 sm:pb-0 lg:mt-0">
          <h2 className="text-center text-[2rem] font-semibold">
            Solicitudes de entrada disponibles
          </h2>
          <VisitorRequestInfo
            setSelectedActiveRequest={setSelectedActiveRequest}
            selectedActiveRequest={selectedActiveRequest}
          />
        </div>
      </div>
    </div>
  );
}
