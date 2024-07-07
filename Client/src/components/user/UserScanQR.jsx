import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import codeQR from "../../assets/images/qr.svg";
import GeneralButton from "../../components/buttons/GeneralButton";
import { LogoInitialsIcon } from "../../components/Icons";
import { toast } from "sonner"; // Asegúrate de importar toast correctamente
import { Modal, Select, Input } from "antd";
import { createAnonymousRequest, sendQr } from "../../services/qr.service";
import { fetchHouseData } from "../../services/house.service";
import { capitalizeWords } from "../../lib/utils";

const { Option } = Select;

export default function UserScanQR() {
  let [isScanQR, setScanQr] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [isAnonymousModalOpen, setAnonymousModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [reason, setReason] = useState("");
  const [house, setHouse] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [houseData, setHouseData] = useState([]);
  const [loadingHouses, setLoadingHouses] = useState(true);

  const commonReasons = [
    "Dejar comida en la casa",
    "Entrega de paquete",
    "Visita de mantenimiento",
    "Servicio de limpieza",
    "Reparación de electrodomésticos",
    "Instalación de servicios",
    "Reunión social",
    "Evento especial",
    "Servicio de jardinería",
    "Otras",
  ];

  useEffect(() => {
    const loadHouseData = async () => {
      try {
        const data = await fetchHouseData();
        setHouseData(data);
      } catch (error) {
        console.error("Error loading house data:", error);
      } finally {
        setLoadingHouses(false);
      }
    };

    loadHouseData();
  }, []);

  const handleScan = (result) => {
    console.log({ result });
    if (result != null) {
      setQrResult(result.text);
      setScanQr(false);
      setModalOpen(true);
    }
  };

  const handleError = (err) => {
    console.log({ err });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setScanQr(false);
  };

  const handleConfirm = async () => {
    console.log("Confirmed!");
    if (qrResult) {
      try {
        const requestData = { qrCode: qrResult };
        await sendQr(requestData);
        // toast.success("QR request sent successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to send QR request");
      }
    }
    handleCloseModal();
  };

  const handleAnonymousRequest = () => {
    setAnonymousModalOpen(true);
  };

  const handleCreateAnonymousRequest = async () => {
    try {
      const requestData = {
        businessName,
        reason: selectedReason === "Otras" ? customReason : selectedReason,
        house,
      };
      await createAnonymousRequest(requestData);
      // toast.success("Anonymous request created successfully");
      setAnonymousModalOpen(false);
      setBusinessName("");
      setReason("");
      setHouse("");
      setCustomReason("");
      setSelectedReason("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create anonymous request");
    }
  };

  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-10 sm:min-h-[70vh] sm:gap-16">
      <LogoInitialsIcon />
      <div className="relative flex flex-col items-center justify-center gap-8 font-Inter leading-[1.8125rem] sm:gap-9">
        <h1 className="w-3/4 min-w-32 text-center text-3xl font-bold sm:w-2/3 sm:text-5xl">
          Escanear llave de entrada
        </h1>
      </div>
      <div className="relative flex max-h-48 w-full min-w-14 max-w-48 items-center justify-center border border-gray-500 p-3 sm:max-h-80 sm:max-w-80">
        <div className="absolute -right-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-l-0 border-black"></div>
        <div className="absolute -left-2 -top-2 h-4 w-4 border-[3px] border-b-0 border-r-0 border-black"></div>
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-[3px] border-r-0 border-t-0 border-black"></div>
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-[3px] border-l-0 border-t-0 border-black"></div>
        {!isScanQR ? (
          <img
            src={codeQR}
            alt="QR code"
            className="w-full min-w-12 max-w-44 bg-cover sm:max-w-72"
          />
        ) : (
          <QrReader
            delay={100}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", height: "100%" }}
            constraints={{
              audio: false,
              video: { facingMode: "environment" },
            }}
          />
        )}
      </div>
      <GeneralButton
        textDescription={"Escanear código QR"}
        className=" text-lg font-light  sm:text-2xl"
        action={() => setScanQr(!isScanQR)}
      />
      <GeneralButton
        textDescription={"Crear solicitud anónima"}
        className=" text-lg font-light sm:text-2xl"
        action={handleAnonymousRequest}
      />
      <Modal
        title="¿Quieres crear la solicitud de invitación?"
        visible={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCloseModal}
      ></Modal>
      <Modal
        title="Crear solicitud anónima"
        visible={isAnonymousModalOpen}
        onOk={handleCreateAnonymousRequest}
        onCancel={() => setAnonymousModalOpen(false)}
      >
        <div>
          <label>Nombre del negocio:</label>
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Nombre del negocio"
          />
        </div>
        <div>
          <label>Razón:</label>
          <Select
            value={selectedReason}
            onChange={(value) => setSelectedReason(value)}
            placeholder="Selecciona una razón"
            style={{ width: "100%" }}
            showSearch
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
            {commonReasons.map((reason) => (
              <Option key={reason} value={reason}>
                {reason}
              </Option>
            ))}
          </Select>
          {selectedReason === "Otras" && (
            <Input
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Ingrese la razón"
              style={{ marginTop: "10px" }}
            />
          )}
        </div>
        <div>
          <label>Casa:</label>
          <Select
            value={house}
            onChange={(value) => setHouse(value)}
            placeholder="Selecciona una casa"
            style={{ width: "100%" }}
            loading={loadingHouses}
            showSearch
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
            {houseData.map((house) => (
              <Option key={house.id} value={house.id}>
                {house.address} -{" "}
                {house?.responsible?.name
                  ? capitalizeWords(house?.responsible?.name)
                  : "Sin responsable"}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
