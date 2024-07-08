import React, { useEffect, useState } from "react";
import { TableComponent } from "../../components/table/GeneralTable";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SectionIntro from "../../components/SectionIntro";
import { getAllRequests } from "../../services/request.service";
import { Modal, Button, Avatar, List, Tag, Card } from "antd";
import { UserOutlined, HomeOutlined, MailOutlined, CalendarOutlined } from "@ant-design/icons";


const requestTags = [
  "razon",
  "visitante",
  "residente",
  "fecha_inicio",
  "fecha_fin",
  "estado_solicitud",
];
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

  const count = requestData.length;
  return (
    <DashboardLayout>
      {count === 0 ? (
        <SectionIntro title="Lista de solicitudes" />
      ) : (
        <SectionIntro title={`Lista de solicitudes &mdash; ${count}`} />
      )}
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
          <Card style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <Tag color="blue" icon={<CalendarOutlined />}>
                {selectedRequest.fecha_inicio}
              </Tag>
              <h3><strong>Razón:</strong> {selectedRequest.reason}</h3>
              <h4>
                <UserOutlined /> <strong>{selectedRequest.resident.name}</strong>
              </h4>
              <p>
                <MailOutlined /> <strong>Email visitante:</strong> {selectedRequest.visitor.email}
              </p>
              <p><strong>Estado de la solicitud:</strong> <Tag color="green">{selectedRequest.estado_solicitud}</Tag></p>
            </div>
            <div>
              <h3><HomeOutlined /> <strong>Casa</strong></h3>
              <p><strong>Dirección:</strong> {selectedRequest.house.address}</p>
              <p><strong>Responsable:</strong> {selectedRequest.house.responsible.name}</p>
              <p><strong>Email del responsable:</strong> {selectedRequest.house.responsible.email}</p>
              <div>
                <h4><strong>Residentes</strong></h4>
                <List
                  itemLayout="horizontal"
                  dataSource={selectedRequest.house.residents}
                  renderItem={(resident) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={resident.picture || <UserOutlined />} />}
                        title={<strong>{resident.name}</strong>}
                        description={<span><strong>Email:</strong> {resident.email}</span>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Card>
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
