import React, { useEffect, useState } from "react";
import { getAllRequestsByVisitor } from "../../services/request.service";
import { Modal, Button, Select, Spin } from "antd";
import UserRequestContainer from "../UserRequestContainer";
import moment from "moment";
import GeneralButton from "../buttons/GeneralButton";
import { LoadingComponent } from "../Loading";

const { Option } = Select;

export default function VisitorRequestInfo({
  setSelectedActiveRequest,
  selectedActiveRequest,
}) {
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeRequests, setActiveRequests] = useState([]);
  const [qrAvailableRequests, setQrAvailableRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = moment();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const result = await getAllRequestsByVisitor();
      const sortedRequests = sortRequests(result);
      setRequests(sortedRequests);
      processRequests(sortedRequests);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const sortRequests = (requests) => {
    return requests.sort((a, b) => {
      const aStart = moment(`${a.startDate.split("T")[0]} ${a.startTime}`);
      const bStart = moment(`${b.startDate.split("T")[0]} ${b.startTime}`);
      const aEnd = moment(`${a.endDate.split("T")[0]} ${a.endTime}`);
      const bEnd = moment(`${b.endDate.split("T")[0]} ${b.endTime}`);

      const aIsActive = now.isBetween(aStart, aEnd);
      const bIsActive = now.isBetween(bStart, bEnd);

      const aQrAvailable = now.isBetween(
        aStart.clone().subtract(30, "minutes"),
        aEnd.clone().add(30, "minutes"),
      );
      const bQrAvailable = now.isBetween(
        bStart.clone().subtract(30, "minutes"),
        bEnd.clone().add(30, "minutes"),
      );

      const aHasPassed = now.isAfter(aEnd);
      const bHasPassed = now.isAfter(bEnd);

      if (aQrAvailable && !bQrAvailable) return -1;
      if (!aQrAvailable && bQrAvailable) return 1;

      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;

      if (aHasPassed && !bHasPassed) return 1;
      if (!aHasPassed && bHasPassed) return -1;
      // activas, disponibles, noormales y pasadas
      // if (aIsActive && !bIsActive) return -1;
      // if (!aIsActive && bIsActive) return 1;

      // if (aQrAvailable && !bQrAvailable) return -1;
      // if (!aQrAvailable && bQrAvailable) return 1;

      // if (!aIsActive && aHasPassed && bIsActive) return 1;
      // if (aIsActive && bHasPassed) return -1;

      return aStart.diff(bStart);
    });
  };

  const processRequests = (sortedRequests) => {
    const activeReqs = [];
    const qrAvailableReqs = [];

    sortedRequests.forEach((request) => {
      const startDate = moment(
        `${request.startDate.split("T")[0]} ${request.startTime}`,
      );
      const endDate = moment(
        `${request.endDate.split("T")[0]} ${request.endTime}`,
      );

      const isActive = now.isBetween(startDate, endDate);
      const qrAvailable = now.isBetween(
        startDate.clone().subtract(30, "minutes"),
        endDate.clone().add(30, "minutes"),
      );

      if (isActive) {
        activeReqs.push(request);
      }
      if (qrAvailable && !isActive) {
        qrAvailableReqs.push(request);
      }
    });

    setActiveRequests(activeReqs);
    setQrAvailableRequests(qrAvailableReqs);
    setSelectedActiveRequest(activeReqs[0] || qrAvailableReqs[0] || null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleShowAllRequests = () => {
    setIsModalVisible(true);
  };

  const handleActiveRequestChange = (value) => {
    const selectedRequest = activeRequests
      .concat(qrAvailableRequests)
      .find((request) => request.id === value);
    setSelectedActiveRequest(selectedRequest);
  };

  const getHeaderMessage = () => {
    if (activeRequests.concat(qrAvailableRequests).length > 1) {
      return "Tienes múltiples solicitudes";
    } else if (activeRequests.length > 1) {
      return "Tienes múltiples solicitudes activas";
    } else if (activeRequests.length === 1) {
      return "Tienes una solicitud activa";
    } else if (qrAvailableRequests.length > 1) {
      return "Tienes múltiples QR disponibles";
    } else if (qrAvailableRequests.length === 1) {
      return "Tienes un QR disponible";
    } else {
      return "Todavía no puedes entrar";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {loading ? (
         <LoadingComponent />
      ) : activeRequests.length > 0 || qrAvailableRequests.length > 0 ? (
        <div className="flex flex-col gap-3 text-center">
          <h2 className="mb-2 mt-4 text-xl font-semibold">
            {getHeaderMessage()}
          </h2>
          {getHeaderMessage().startsWith("Tienes múltiples solicitudes") && (
            <p>Selecciona una solicitud donde quieres ingresar</p>
          )}
          <Select
            style={{ width: "100%", marginBottom: "16px" }}
            placeholder="Selecciona una solicitud activa"
            className="limited-width-select"
            onChange={handleActiveRequestChange}
            defaultValue={selectedActiveRequest?.id}
          >
            {activeRequests.concat(qrAvailableRequests).map((request) => (
              <Option key={request.id} value={request.id}>
                {request.house.address} desde {request.startTime} hasta{" "}
                {request.endTime}
              </Option>
            ))}
          </Select>

          <h3 className="text-lg mt-8 font-semibold">
            Detalles de la solicitud seleccionada
          </h3>
          {selectedActiveRequest && (
            <UserRequestContainer
              key={selectedActiveRequest.id}
              userName={selectedActiveRequest.visitor.name}
              date={selectedActiveRequest.startDate.split("T")[0]}
              time={
                selectedActiveRequest.startTime ===
                selectedActiveRequest.endTime
                  ? selectedActiveRequest.startTime
                  : `${selectedActiveRequest.startTime} - ${selectedActiveRequest.endTime}`
              }
              to="#"
              address={selectedActiveRequest.house.address}
              reason={selectedActiveRequest.reason}
              status={selectedActiveRequest.status}
              isActive={activeRequests.includes(selectedActiveRequest)}
              hasPassed={now.isAfter(
                moment(
                  `${selectedActiveRequest.endDate.split("T")[0]} ${selectedActiveRequest.endTime}`,
                ),
              )}
              qrAvailable={qrAvailableRequests.includes(selectedActiveRequest)}
            />
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Todavía no puedes entrar</h2>
          {requests.length > 0 && (
            <p>
              Tu siguiente entrada será desde {requests[0].startTime} hasta{" "}
              {requests[0].endTime} el{" "}
              {moment(requests[0].startDate).format("DD-MM-YYYY")}
            </p>
          )}
        </div>
      )}
      <GeneralButton
        textDescription={" Mostrar todas las solicitudes"}
        action={handleShowAllRequests}
        className="mt-4 bg-slate-700 hover:to-blue-700"
      />
      <Modal
        title="Todas las solicitudes"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={<Button onClick={handleModalClose}>Cerrar</Button>}
      >
        <div className="flex flex-col gap-4">
          {requests.map((request) => {
            const startDate = moment(
              `${request.startDate.split("T")[0]} ${request.startTime}`,
            );
            const endDate = moment(
              `${request.endDate.split("T")[0]} ${request.endTime}`,
            );

            const isActive = now.isBetween(startDate, endDate);
            const hasPassed = now.isAfter(endDate);
            const qrAvailable = now.isBetween(
              startDate.clone().subtract(30, "minutes"),
              endDate.clone().add(30, "minutes"),
            );

            return (
              <UserRequestContainer
                key={request.id}
                userName={request.visitor.name}
                date={request.startDate.split("T")[0]}
                time={
                  request.startTime === request.endTime
                    ? request.startTime
                    : `${request.startTime} - ${request.endTime}`
                }
                to="#"
                address={request.house.address}
                reason={request.reason}
                status={request.status}
                isActive={isActive}
                hasPassed={hasPassed}
                qrAvailable={qrAvailable}
              />
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
