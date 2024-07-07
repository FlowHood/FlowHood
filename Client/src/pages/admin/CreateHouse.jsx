import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Switch } from "antd";
import axios from "axios";
import GeneralButton from "../../components/buttons/GeneralButton";
import UserLayout from "../../components/user/UserLayout";
import { getAllUsers } from "../../services/user.service";
import { capitalizeWords } from "../../lib/utils";
import { createHouse } from "../../services/house.service";
import { toast } from "sonner";
import SectionIntro from "../../components/SectionIntro";

const { Option } = Select;

export function CreateHouseForm() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [responsible, setResponsible] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  const handleAddUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = (values) => {
    setIsSubmitting(true);
    // quiero filtrar los residentIds, si existe un usuario con el mismo id que el responsable, lo elimino
    const newSelectedUsers = selectedUsers.filter(
      (user) => user.id !== responsible,
    );

    const houseData = {
      address: values.address,
      responsibleId: responsible,
      residentIds: newSelectedUsers.map((user) => user.id),
    };

    console.log("House data:", houseData);

    createHouse(houseData)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="form-container  max-w-[700px] w-full mx-auto">
      <SectionIntro title="Crear una nueva casa" />
      <Form layout="vertical" onFinish={handleFormSubmit}>
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
                {capitalizeWords(user.name)} ({user.email})
              </span>
              <Button onClick={() => handleRemoveUser(user.id)}>Remove</Button>
            </div>
          ))}
        </div>

        <Form.Item label="Usuario responsable de la casa">
          <Select
            placeholder="Seleccionar usuario responsable"
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
            textDescription={"Create House"}
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
