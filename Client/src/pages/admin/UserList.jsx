import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";
import { toast } from "sonner";
import { fetchUserData, deleteUser } from "../../services/user.service";
import { Modal, Button, Avatar, List, Tag } from "antd";
import { VIEWS } from "../../lib/views";
import { useNavigate } from "react-router-dom";

const userTags = [];
const userSearch = ["name", "email"];
const userSorter = ["name"];
const userFiltersOn = ["state", "roles"];

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const count = userData.length;
  return (
    <DashboardLayout>
      {count === 0 ? (
        <SectionIntro title="Lista de usuarios" />
      ) : (
        <SectionIntro title={`Lista de usuarios &mdash; ${count}`} />
      )}

      <div className="rounded-xl bg-white p-6 shadow-card">
        <UsersTable userData={userData} setUserData={setUserData} />
      </div>
    </DashboardLayout>
  );
};

export const UsersTable = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [userDataRaw, setUserDataRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserDataRaw(data);
        // a data, quitarle los atributos houses y admHouses
        const filteredData = data.map((user) => {
          const { houses, admHouses, ...rest } = user;
          return rest;
        });
        setUserData(filteredData);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de deshabilitar este usuario?",
    );
    if (!confirmDelete) {
      return;
    }

    await deleteUser(id);

    // Cambiarle el estado a inactivo
    const updatedData = userData.map((user) => {
      if (user.id === id) {
        return { ...user, estado: "inactivo" };
      }
      return user;
    });
    setUserData(updatedData);
  };

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    navigate(VIEWS.manageUser.replace(":id", id));
  };

  const handleView = (id) => {
    const user = userDataRaw.find((user) => user.id === id);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableComponent
        data={userData}
        addTagsOn={userTags}
        addSearchOn={userSearch}
        addSortOn={userSorter}
        addFiltersOn={userFiltersOn}
        onEdit={handleEdit} // No enviar función de editar
        onDelete={handleDelete}
        onView={handleView} // Agregar función de ver más
      />
      <Modal
        title="User Information"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Avatar size={96} src={selectedUser.picture} />
              <h2>
                {selectedUser.name} {selectedUser.lastname}
              </h2>
              <p>Email: {selectedUser.email}</p>
              <p>Estado: {selectedUser.estado}</p>
            </div>
            <div>
              <h3>Roles</h3>
              {selectedUser.roles.split(",").map((role) => (
                <Tag key={role}>{role}</Tag>
              ))}
            </div>
            <div>
              <h3 className="mt-8">Casas ({selectedUser.houses.length})</h3>
              {selectedUser?.houses?.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={selectedUser.houses}
                  renderItem={(house) => (
                    <List.Item>
                      <List.Item.Meta
                        // avatar={<Avatar src={house.responsible.picture} />}
                        title={house.address}
                        description={
                          "Email responsable: " + house.responsible.email
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <p>Ninguna casa asignada.</p>
              )}
            </div>
            <div>
              <h3 className="mt-8">
                Casas administradas ({selectedUser.admHouses.length})
              </h3>
              {selectedUser?.admHouses?.length > 0 ? (
                <div className="space-y-4">
                  {selectedUser.admHouses.map((house) => (
                    <div
                      key={house.id}
                      className="rounded-lg border bg-white p-4 shadow-md"
                    >
                      <div className="mb-4 flex items-center">
                        <Avatar
                          src={house.responsible.picture}
                          className="mr-3"
                        />
                        <div>
                          <h3 className="text-md font-semibold">
                            {house.address}
                          </h3>
                          <p className="text-gray-600"></p>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium">Residentes</h4>
                        <div className="space-y-2">
                          {house.residents.map((resident) => (
                            <div
                              key={resident.id}
                              className="flex items-center rounded-lg border bg-gray-50 p-2"
                            >
                              <Avatar src={resident.picture} className="mr-3" />
                              <div>
                                <h5 className="font-medium">{resident.name}</h5>
                                <p className="text-gray-500">
                                  {resident.email}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Ninguna casa administrada.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserList;
