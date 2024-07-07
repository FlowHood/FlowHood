import React, { useEffect, useState } from "react";
import { TableComponent } from "../../components/table/GeneralTable";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SectionIntro from "../../components/SectionIntro";
import { getAllRequests } from "../../services/request.service";
import { Modal, Button, Avatar, List, Tag } from "antd";

const requestTags = ["razon", "visitante", "residente", "fecha_inicio", "fecha_fin", "estado_solicitud"];
const requestSearch = ["razon", "visitante", "residente"];
const requestSorter = ["fecha_inicio", "fecha_fin"];
const requestFiltersOn = ["estado_solicitud"];

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [requestDataRaw, setRequestDataRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAllRequests();
      setRequestDataRaw(data);
      const filteredData = data.map((request) => {

        // a data, quitarle los atributos resident,visitor,house y reason
        const { resident, visitor, house, reason, ...rest } = request;
        return rest;
      });
      setRequestData(filteredData);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const handleView = (id) => {
    const request = requestDataRaw.find((req) => req.id === id);
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  return (
    <DashboardLayout>
      <SectionIntro title="Lista de solicitudes" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        {loading ? (
          <span>Cargando...</span>
        ) : (
          <RequestTable data={requestData} onView={handleView} />
        )}
      </div>
      <Modal
        title="Información de la Solicitud"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "41px" }}>
            <p>Razón: {selectedRequest.reason}</p>
              <h2>{selectedRequest.resident.name}</h2> 
              <p>Email visitante: {selectedRequest.visitor.email}</p>
              <p>Fecha de inicio: {selectedRequest.fecha_inicio}</p>
              {/* <p>Fecha de fin: {selectedRequest.fecha_fin}</p> */}
              <p>Estado de la solicitud: {selectedRequest.estado_solicitud}</p>
              
            </div>
            <div>
              <h3>Casa</h3>
              <p>Dirección: {selectedRequest.house.address}</p>
              <p>Responsable: {selectedRequest.house.responsible.name}</p>
              <p>Email del responsable: {selectedRequest.house.responsible.email}</p>
              <div>
                <h4>Residentes</h4>
                <List
                  itemLayout="horizontal"
                  dataSource={selectedRequest.house.residents}
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
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

const RequestTable = ({ data, onView }) => {
  return (
    <TableComponent
      data={data}
      addTagsOn={requestTags}
      addSearchOn={requestSearch}
      addSortOn={requestSorter}
      addFiltersOn={requestFiltersOn}
      onView={onView}
    />
  );
};

export default RequestList;
