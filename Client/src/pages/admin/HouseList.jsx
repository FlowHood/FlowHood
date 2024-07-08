import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";
import { deleteHouse, fetchHouseData } from "../../services/house.service";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { VIEWS } from "../../lib/views";
import { Modal, Avatar, List, Button as AntdButton } from "antd";
import Button from "../../components/buttons/Button";

const houseTags = ["owner_name"];
const houseSearch = ["address", "owner_name"];
const houseSorter = ["house_number", "residents"];
const houseFiltersOn = ["estado"];

const HouseList = () => {
  const navigate = useNavigate();
  const [houseData, setHouseData] = useState([]);
  const [houseDataRaw, setHouseDataRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const loadHouseData = async () => {
      try {
        const data = await fetchHouseData();
        setHouseDataRaw(data);
        const filteredData = data.map((house) => {
          const { responsible, residents, ...rest } = house;
          return rest;
        });
        setHouseData(filteredData);
      } catch (error) {
        console.error("Error loading house data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHouseData();
  }, []);

  const handleView = (id) => {
    const house = houseDataRaw.find((house) => house.id === id);
    setSelectedHouse(house);
    console.log("Selected house:", house);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedHouse(null);
  };

  const handleEdit = (id) => {
    console.log("Edit house with id:", id);
    navigate(VIEWS.manageHouse.replace(":id", id));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de deshabilitar esta casa?",
    );
    if (!confirmDelete) {
      return;
    }

    await deleteHouse(id);

    // Cambiarle el estado a inactivo
    const updatedData = houseData.map((house) => {
      if (house.id === id) {
        return { ...house, estado: "inactivo" };
      }
      return house;
    });

    setHouseData(updatedData);
  };

  const count = houseData.length;
  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        {count === 0 ? (
        <SectionIntro title="Lista de casas" />
      ) : (
        <SectionIntro title={`Lista de casas &mdash; ${count}`} />
      )}
        <Button
          as={Link}
          to={VIEWS.manageHouse.replace(":id", "")}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Crear casa
        </Button>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-card">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <HouseTable
            data={houseData}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <Modal
        title="Información de la Casa"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <AntdButton key="close" onClick={handleModalClose}>
            Cerrar
          </AntdButton>,
        ]}
      >
        {selectedHouse && (
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                marginTop: "41px",
              }}
            >
              <p>Dirección: {selectedHouse.address}</p>
              <p>Estado: {selectedHouse.estado}</p>

              {selectedHouse.responsible ? (
                <>
                  <h3 className="mt-5 font-bold">Responsable</h3>
                  <Avatar size={96} src={selectedHouse.responsible.picture} />
                  <h2>{selectedHouse.owner_name}</h2>
                  <p>
                    Email del responsable: {selectedHouse.responsible.email}
                  </p>
                </>
              ) : (
                <h2>Sin responsable asignado</h2>
              )}
            </div>
            <div>
              <h3>Residentes</h3>
              {selectedHouse.residentsData &&
              selectedHouse.residentsData.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={selectedHouse.residentsData}
                  renderItem={(resident) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={resident.picture} />}
                        title={resident.name}
                        description={"Email: " + resident.email}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <p>Sin residentes</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

const HouseTable = ({ data, onView, onDelete, onEdit }) => {
  return (
    <TableComponent
      data={data}
      addTagsOn={houseTags}
      addSearchOn={houseSearch}
      addSortOn={houseSorter}
      addFiltersOn={houseFiltersOn}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default HouseList;
