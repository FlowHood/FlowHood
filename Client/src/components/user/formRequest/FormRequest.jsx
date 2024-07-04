import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Switch,
  Select,
  Card,
  DatePicker,
  TimePicker,
} from "antd";
import { IoPersonSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { toast } from "sonner";
import { fetchUserData } from "../../../services/user.service";
import { useAuth } from "../../../context/AuthContext";
import GeneralButton from "../../buttons/GeneralButton";
import { createRequest } from "../../../services/request.service";
import { capitalizeWords } from "../../../lib/utils";
import { ROL, getRoleDescription } from "../../../lib/rol";
import { HouseCard } from "../../../pages/account/ResidentAccountView";

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

        const visitors = data.filter((user) =>
          user.roles.includes(getRoleDescription(ROL.VISITOR)),
        );

        console.log(data);
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
    let formattedDates;
    let startTime;
    let endTime;

    if (isPeriodic) {
      formattedDates = values.dates.map((date) => date.toISOString());
      startTime = values.startTime.format("HH:mm");
      endTime = values.endTime?.format("HH:mm") || null;
    } else {
      formattedDates = [values.date.toISOString()];
      startTime = values.startTime.format("HH:mm");
      endTime = values.endTime?.format("HH:mm") || null;
    }

    const requestData = {
      dates: formattedDates,
      startTime: startTime,
      // endTime: endTime,
      reason: values.reason || null,
      resident: user.id, // Assuming the authenticated user's ID is the resident
      visitor: values.visitor,
      house: values.house,
    };

    if (endTime) {
      requestData.endDate = endTime;
    }

    console.log("Request data", requestData);

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
          Para poder crear una invitación debes tener una casa asociada a tu
          cuenta
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center justify-center gap-4 p-4 md:max-w-[75%]">
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
        <Form.Item
          label="Visitante"
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

        {myhouses.length > 1 ? (
          <>
            <Form.Item
              label="Casa"
              name={"house"}
              rules={[{ required: true, message: "Este campo es obligatorio" }]}
            >
              <Select placeholder="Selecciona tu casa">
                {myhouses.map((house) => (
                  <Option key={house.id} value={house.id}>
                    {house.address} -{" "}
                    {house?.responsible?.name || "Sin responsable"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : (
          <HouseCard house={myhouses[0]} title="Mi unica casa asociada es:" />
        )}

        <div className="flex flex-col gap-3">
          <div className="mx-auto flex max-w-lg flex-row  items-center justify-center gap-4">
            <p>Visita programada</p>
            <Form.Item style={{ marginBottom: 0 }} valuePropName="checked">
              <Switch onChange={(e) => setIsPeriodic(e)} />
            </Form.Item>
          </div>
          {isPeriodic ? (
            <>
              <Form.Item
                label="Fechas de visita"
                name="dates"
                rules={[
                  { required: true, message: "Este campo es obligatorio" },
                ]}
              >
                <DatePicker multiple className="p-2" format="YYYY-MM-DD" />
              </Form.Item>
              <div className="gal-4 flex">
                <Form.Item
                  label="Hora de inicio"
                  name="startTime"
                  rules={[
                    { required: true, message: "Este campo es obligatorio" },
                  ]}
                >
                  <TimePicker className="p-2" format="HH:mm" />
                </Form.Item>
                <Form.Item label="Hora de fin" name="endTime">
                  <TimePicker className="p-2" format="HH:mm" />
                </Form.Item>
              </div>
            </>
          ) : (
            <>
              <Form.Item
                label="Fecha de visita"
                name="date"
                rules={[
                  { required: true, message: "Este campo es obligatorio" },
                ]}
              >
                <DatePicker className="p-2" format="YYYY-MM-DD" />
              </Form.Item>
              <div className="gal-4 flex">
                <Form.Item
                  label="Hora de inicio"
                  name="startTime"
                  rules={[
                    { required: true, message: "Este campo es obligatorio" },
                  ]}
                >
                  <TimePicker className="p-2" format="HH:mm" />
                </Form.Item>
                <Form.Item label="Hora de fin" name="endTime">
                  <TimePicker className="p-2" format="HH:mm" />
                </Form.Item>
              </div>
            </>
          )}
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
