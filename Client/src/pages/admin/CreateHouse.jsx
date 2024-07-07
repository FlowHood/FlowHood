import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton";
import UserLayout from "../../components/user/UserLayout";
import { getAllUsers } from "../../services/user.service";
import { capitalizeWords } from "../../lib/utils";
import {
  createHouse,
  updateHouse,
  getHouseById,
} from "../../services/house.service";
import { toast } from "sonner";
import SectionIntro from "../../components/SectionIntro";
import { VIEWS } from "../../lib/views";
import { LoadingComponent } from "../../components/Loading";

const { Option } = Select;

export function CreateHouseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [responsible, setResponsible] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
    if (id) {
      fetchHouseData(id);
    }
  }, [id]);

  const fetchHouseData = async (houseId) => {
    try {
      setIsSubmitting(true);
      const house = await getHouseById(houseId);

      form.setFieldsValue({
        address: house.address,
      });

      console.log("House data:", house);
      const residents = house.residents || [];
      const responsible = house.responsible || [];
      const residentsWithResponsible = residents.concat(responsible);

      setSelectedUsers(residentsWithResponsible || []);
      setResponsible(house.responsible ? house.responsible.id : null); // setResponsible to the responsible's ID

      console.log("Res:", selectedUsers, " ", responsible);
    } catch (error) {
      console.error("Failed to fetch house data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUser = (userId) => {
    console.log("Adding user with ID:", userId);
    const user = users.find((u) => u.id === userId);
    // Eliminar ususario repetidos:
    if (selectedUsers.find((u) => u.id === userId)) {
      console.log("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    const newSelectedUsers = selectedUsers.filter(
      (user) => user.id !== responsible,
    );

    const houseData = {
      address: values.address,
      responsibleId: responsible,
      residentIds: newSelectedUsers.map((user) => user.id),
    };

    if (id) {
      console.log("Updating house with data:", houseData);
      const data = await updateHouse(houseData, id);
      if (data && data.message === "house updated") {
        
        navigate(VIEWS.houseList);
        toast.success("Casa actualizada exitosamente");
      }
      setIsSubmitting(false);
    } else {
      console.log("Creating house with data:", houseData);
      const data = await createHouse(houseData);
      if (data && data.message === "house created") {
        navigate(VIEWS.houseList);
        toast.success("Casa creada exitosamente");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container  mx-auto w-full max-w-[700px]">
      {isSubmitting && (
        <div className="absolute left-0 top-0 z-50 flex h-full min-h-screen w-full items-center justify-center bg-slate-500/30">
          <LoadingComponent />
        </div>
      )}
      <SectionIntro title={id ? "Actualizar casa" : "Crear una nueva casa"} />
      <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
        <Form.Item
          label="Dirección de la casa"
          name="address"
          rules={[{ required: true, message: "La dirección es requerida" }]}
        >
          <Input placeholder="Ingresa la dirección de la casa" />
        </Form.Item>

        <Form.Item label="Agregar residentes">
          <Select
            showSearch
            placeholder="Buscar usuarios"
            onSelect={handleAddUser}
            filterOption={(input, option) => {
              const childrenString = React.Children.map(
                option.children,
                (child) => child,
              )
                .join("")
                .toLowerCase();
              return childrenString.indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {capitalizeWords(user.name)} ({user.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="selected-users">
          <h3>Residentes seleccionados</h3>
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="selected-user flex items-center gap-4 border-b pb-1 pt-2"
            >
              <span>
                {capitalizeWords(user?.name || "")} ({user?.email})
              </span>
              <Button onClick={() => handleRemoveUser(user.id)}>Remove</Button>
            </div>
          ))}
        </div>

        <Form.Item label="Usuario responsable de la casa">
          <Select
            placeholder="Seleccionar usuario responsable"
            value={responsible}
            onChange={(value) => setResponsible(value)}
          >
            {selectedUsers.map((user) => (
              <Option key={user.id} value={user.id}>
                {capitalizeWords(user.name)} ({user.email})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <GeneralButton
            textDescription={id ? "Actualizar Casa" : "Crear Casa"}
            type="submit"
            // loading={isSubmitting}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

const CreateHouse = () => {
  return (
    <UserLayout showLogout={false}>
      <CreateHouseForm />
    </UserLayout>
  );
};

export default CreateHouse;
