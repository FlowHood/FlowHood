import React from "react";
import GeneralButton from "../buttons/GeneralButton";
//Icons
import codeQR from "../../assets/images/ex_qr.jpg";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../../context/AuthContext";
import { Form, Select } from "antd";
import { TitleComponent } from "../../pages/PageTest";

const { Option } = Select;

export default function UserCreateQR({ qrInformation = "" }) {
  const { user } = useAuth();

  // Unir dos arrays, el de user.houses y el de user.admhouses
  const houses = user.houses.concat(user.admHouses);
  // Filtrar las casas para eliminar las que sean las mismas
  const myhouses = houses.filter(
    (house, index, self) => index === self.findIndex((t) => t.id === house.id),
  );

  if (myhouses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-center text-2xl font-semibold">
          No tienes casas asociadas
        </h1>
        <p className="text-center">
          Para poder generar una llave QR necesitas tener una casa asociada a tu
          cuenta
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start p-4 text-black sm:gap-20 md:gap-10 lg:gap-12">
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8">
        <div className="relative flex flex-col items-center justify-center gap-8 font-Inter leading-[1.8125rem] sm:gap-9">
          <h1 className=" w-3/4 min-w-44 text-center text-[2rem] font-bold sm:text-4xl">
            Generar llave de entrada
          </h1>
          <p className=" w-3/4 min-w-44 text-center text-[0.85rem] font-light leading-5 sm:text-base">
            Tu llave QR tienen una duración de 10 minutos, luego de que expiré
            el tiempo tendrás que generarlo de nuevo
          </p>
        </div>

        <p className="text-[1.0625rem] font-semibold uppercase leading-[1.6875rem] ">
          Casa
      </p>
        {myhouses.length > 0 && (
          <>
            <Form.Item
              label="Casa"
              name={"house"}
              rules={[{ required: true, message: "Este campo es obligatorio" }]}
              initialValue={myhouses[0].id}
            >
              <Select
                placeholder="Selecciona tu casa"
                defaultValue={myhouses[0].id}
              >
                {myhouses.map((house) => (
                  <Option key={house.id} value={house.id}>
                    {house.address} -{" "}
                    {house?.responsible?.name || "Sin responsable"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        <div className="relative max-h-80  my-10 min-h-40 min-w-40 max-w-80 border border-gray-500 p-3">
          <div className="absolute -right-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-l-0 border-black"></div>
          <div className="absolute -left-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-r-0 border-black"></div>
          <div className="absolute -bottom-2 -left-2 h-4 w-4 border-[3px] border-r-0 border-t-0 border-black"></div>
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-[3px] border-l-0 border-t-0 border-black"></div>
          {qrInformation == "" ? (
            <img
              src={codeQR}
              alt="QR code"
              className="min-h-28 min-w-28 max-w-40 "
            />
          ) : (
            <QRCodeSVG value={qrInformation} />
          )}
        </div>
        <GeneralButton textDescription={"Generar llave QR"} />
      </div>
    </div>
  );
}
