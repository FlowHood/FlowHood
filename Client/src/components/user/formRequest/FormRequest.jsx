import React, { useState, useEffect } from "react";
import { Form, Input, Switch, Select } from "antd";
import { IoPersonSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { toast } from "sonner";
import { fetchUserData } from "../../../services/user.service";
import { useAuth } from "../../../context/AuthContext";
import GeneralButton from "../../buttons/GeneralButton";
import { createRequest } from "../../../services/request.service";
import { capitalizeWords } from "../../../lib/utils";
import { ROL, getRoleDescription } from "../../../lib/rol";

const { Option } = Select;

export default function FormRequest() {
  const [isPeriodic, setIsPeriodic] = useState(false);
  const { user } = useAuth();
  const [visitors, setVisitors] = useState([]);
  const [loadingVisitors, setLoadingVisitors] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const data = await fetchUserData();
        console.log(getRoleDescription(ROL.VISITOR));

        const visitors = data.filter(user => user.roles.includes( getRoleDescription(ROL.VISITOR)));

        console.log(data)
        console.log("visitantes", visitors);

        setVisitors(visitors);
        setLoadingVisitors(false);
      } catch (error) {
        console.error("Error fetching visitors", error);
        toast.error("Error al cargar la lista de visitantes");
      }
    };

    fetchVisitors();
  }, []);

  const onSuccess = async (values) => {
    const startDateTime = new Date(`${values.startDate}T${values.startTime}:00.000Z`).toISOString();
    
    console.log("Start date time:", user);
    const requestData = {
      startDate: startDateTime,
      startTime: values.startTime,
      visitor: values.visitor,
      house: user.houses[0].id, // TODO Asumiendo que el usuario solo tiene una casa
    };

    if (isPeriodic) {
      if (values.endDate) {
        requestData.endDate = values.endDate;
      }
      if (values.endTime) {
        requestData.endTime = values.endTime;
      }
    }

    await createRequest(requestData);
  };

  const onFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (userId) => {
    const user = visitors.find((u) => u.id === userId);
    setSelectedUser(user);
  };

  return (
    <div className="flex w-full max-w-[1024px] mx-auto flex-col items-center justify-center gap-4 p-4 md:max-w-[75%]">
      <div className="flex flex-col items-center justify-center gap-4 text-center font-Inter">
        <h1 className="text-2xl font-semibold ">
          Crear
          <br />
          Invitación
        </h1>
        <p className="w-[80%] text-xs font-light">
          Crea una invitación para que tus visitantes puedan acceder a tu casa
        </p>
      </div>

      <Form
        className="flex w-full flex-col justify-center gap-2 px-3"
        onFinish={onSuccess}
        onFinishFailed={onFailed}
      >
        <h2 className="font-medium">Ingresa los siguientes campos</h2>
        <Form.Item  label="Visitante"
         name={"visitor"}
         rules={[{ required: true, message: "Este campo es obligatorio" }]}
         >
          <Select
            showSearch
            placeholder="Selecciona un visitante"
            loading={loadingVisitors}
            onSelect={handleAddUser}
            filterOption={(input, option) =>
              option.children
                .toString()
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {visitors.map((user) => (
              <Option key={user.id} value={user.id}>
                {capitalizeWords(user.name)} ({user.email})
              </Option>
            ))}
          </Select>
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
          <Form.Item className="p-2" label="Fecha final" name={"endDate"}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Hora final" className="p-2" name={"endTime"}>
            <Input type="time" />
          </Form.Item>
        </div>
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


