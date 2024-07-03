import React, { useEffect, useState } from "react";
import { TableComponent } from "../../components/table/GeneralTable";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SectionIntro from "../../components/SectionIntro";
import { getAllRequests } from "../../services/request.service";

const requestTags = ["razon", "visitante", "residente", "fecha_inicio", "fecha_fin", "estado_solicitud"];
const requestSearch = ["razon", "visitante", "residente"];
const requestSorter = ["fecha_inicio", "fecha_fin"];
const requestFiltersOn = ["estado_solicitud"];

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAllRequests();
      setRequestData(data);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  return (
    <DashboardLayout>
      <SectionIntro title="Lista de solicitudes" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        {loading ? (
          <span>Cargando...</span>
        ) : (
          <RequestTable data={requestData} />
        )}
      </div>
    </DashboardLayout>
  );
};

const RequestTable = ({ data }) => {
  return (
    <TableComponent
      data={data}
      addTagsOn={requestTags}
      addSearchOn={requestSearch}
      addSortOn={requestSorter}
      addFiltersOn={requestFiltersOn}
    />
  );
};

export default RequestList;
