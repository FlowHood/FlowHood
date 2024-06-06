import React, { useState } from "react";
import { Form, Input, Checkbox, Switch } from "antd";
import GeneralButton from "../../buttons/GeneralButton";
import TextArea from "antd/es/input/TextArea";

//icons
import { IoPersonSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { ROL } from "../../../lib/rol";

export default function FormRequest() {
  const [isPeriodic, setIsPeriodic] = useState(false);
  //check user role to know if reason is optional
  const Role = ROL.VISITOR;

  const onSuccess = (e) => {
    console.log(e);
  };
  const onFailed = (e) => {
    console.log(e);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center justify-center gap-4 text-center font-Inter">
        <h1 className="text-2xl font-semibold ">
          Crear
          <br />
          Invitación
        </h1>
        <p className="w-[80%] text-xs font-light">
          Tu llave QR tienen una duración de 10 minutos, luego de que expiré el
          tiempo tendrás que generarlo de nuevo
        </p>
      </div>

      <Form
        className="flex w-full flex-col justify-center gap-2 px-3"
        onFinish={onSuccess}
        onFinishFailed={onFailed}
      >
        <h2 className="font-medium">Ingresa los siguientes campos</h2>
        <Form.Item
          label="Nombre"
          name={"name"}
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input
            placeholder="Nombre de visitante"
            className="p-2"
            prefix={<IoPersonSharp className="text-gray-400 " />}
          />
        </Form.Item>
        <div className="flex flex-row gap-3">
          <Form.Item
            label="Fecha de visita"
            name={"startDate"}
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input
              className="p-2"
              type="date"
              prefix={<MdCalendarMonth className="text-gray-400 " />}
            />
          </Form.Item>
          <Form.Item
            label="Hora de visita"
            name={"startTime"}
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input type="time" className="p-2" />
          </Form.Item>
        </div>

        <div className="flex flex-row items-center justify-between">
          <p>Visita programada</p>
          <Form.Item valuePropName="checked">
            <Switch onChange={(e) => setIsPeriodic(e)} />
          </Form.Item>
        </div>

        <div className={`flex-row gap-3 ${isPeriodic ? "flex" : "hidden"}`}>
          <Form.Item className="" label="Fecha final" name={"endDate"}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Hora final" name={"endTime"}>
            <Input type="time" />
          </Form.Item>
        </div>
        <Form.Item
          label="Razón de visitante"
          name={"reason"}
          rules={[
            {
              required: Role === ROL.VIGILANT,
              message: "Este campo es obligatorio",
            },
          ]}
        >
          <TextArea
            showCount
            maxLength={200}
            rows={4}
            placeholder="Razón de visitante"
          />
        </Form.Item>
        <GeneralButton
          textDescription={"Crear invitación"}
          type="submit"
          className="self-center px-8"
        />
      </Form>
      <div className="h-[2vh]"></div>
    </div>
  );
}
