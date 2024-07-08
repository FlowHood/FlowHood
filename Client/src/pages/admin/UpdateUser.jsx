import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Avatar, Checkbox } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import GeneralButton from "../../components/buttons/GeneralButton";
import UserLayout from "../../components/user/UserLayout";
import {
  fetchUserById,
  toggleRole,
  updateUserById,
} from "../../services/user.service";
import { getHouseById } from "../../services/house.service";
import { toast } from "sonner";
import SectionIntro from "../../components/SectionIntro";
import { VIEWS } from "../../lib/views";
import { LoadingComponent } from "../../components/Loading";
import { ROL } from "../../lib/rol";

const { Option } = Select;
const options = [
  { label: "Administrador", value: ROL.ADMIN },
  { label: "Vigilante", value: ROL.VIGILANT },
  { label: "Responsable", value: ROL.OWNER, disabled: true },
  { label: "Residente", value: ROL.RESIDENT, disabled: true },
  { label: "Visitante", value: ROL.VISITOR },
];

export function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasUserHouse, setHasUserHouse] = useState(false);

  useEffect(() => {
    fetchUserById(id).then((user) => {
      if (user) {
        setSelectedUser(user);
        setSelectedRole(user.roles);
        const role = user.roles.find(
          (role) => role === ROL.OWNER || role === ROL.RESIDENT,
        );

        if (role && role.length > 0) {
          setHasUserHouse(true);
        }

        setUserStatus(user.estado);
        form.setFieldsValue({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          state: user.estado,
          roles: user.roles,
        });
      }
    });
  }, [id]);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);

    const userData = {
      name: values.name,
      lastname: values.lastname,
      state: values.state,
      picture: selectedUser ? selectedUser.picture || "#" : "#",
      email: values.email,
    };

    if (id) {
      console.log("Updating user with data:", userData);
      const data = await updateUserById(id, userData);
      selectedRole.forEach((roleId) => {
        if (roleId === ROL.OWNER || roleId === ROL.RESIDENT) {
          return;
        }
        toggleRole(id, selectedRole).then((data) => {
          console.log("Role updated:", data);
        });
      });
      console.log("Data:", data);
      if (data && data.message === "updated") {
        navigate(VIEWS.userList);
        toast.success("Usuario actualizada exitosamente");
      }
      setIsSubmitting(false);
    }
  };

  const onStateChange = (e) => {
    setUserStatus(e.target.value);
  };

  const onRoleChange = (checkedValues) => {
    setSelectedRole(checkedValues);
  };

  return (
    <div className="form-container  mx-auto w-full max-w-[700px]">
      {(isSubmitting || selectedUser == null) && (
        <div className="absolute left-0 top-0 z-50 flex h-full min-h-screen w-full items-center justify-center bg-slate-500/30">
          <LoadingComponent />
        </div>
      )}
      <SectionIntro title={"Actualizar usuario"} />

      {selectedUser && (
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Avatar size={96} src={selectedUser.picture} />
            <h2>
              {selectedUser.name} {selectedUser.lastname}
            </h2>
          </div>
        </div>
      )}

      <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
        <div className="flex flex-row gap-4">
          <Form.Item
            className="w-full"
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input placeholder="Ingrese el nombre del usuario" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Apellido"
            name="lastname"
            rules={[{ required: true, message: "El apellido es obligatorio" }]}
          >
            <Input placeholder="Ingrese el apellido del usuario" />
          </Form.Item>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "El email es obligatorio" }]}
        >
          <Input placeholder="Ingrese el email del usuario" disabled={true} />
        </Form.Item>

        <Form.Item label="Estado del usuario" name={"state"}>
          <Radio.Group onChange={onStateChange} value={userStatus}>
            <Radio value={"ACT"}>Activo</Radio>
            <Radio value={"INC"}>Inactivo</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Roles del usuario" name={"roles"}>
          <Checkbox.Group
            disabled={hasUserHouse}
            options={options}
            onChange={onRoleChange}
            className="gap-3"
          />
        </Form.Item>

        <Form.Item>
          <GeneralButton textDescription={"Actualizar Usuario"} type="submit" />
        </Form.Item>
      </Form>
    </div>
  );
}

const UpdateUser = () => {
  return (
    <UserLayout showLogout={false}>
      <UpdateUserForm />
    </UserLayout>
  );
};

export default UpdateUser;
