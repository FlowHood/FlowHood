import React from "react";
import { TableComponent } from "../../components/table/GeneralTable"; // Ajusta la ruta según sea necesario
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SectionIntro from "../../components/SectionIntro";

const requestData = [
  {
    id: 1,
    request_date: "2024-06-02",
    start_time: "09:00",
    end_time: "11:00",
    reason: "Visita",
    visitor: "Daniel",
    house: 3,
  },
  {
    id: 2,
    request_date: "2024-06-03",
    start_time: "14:00",
    end_time: "16:00",
    reason: "Hogar",
    visitor: "Maria",
    house: 5,
  },
  {
    id: 3,
    request_date: "2024-06-04",
    start_time: "10:30",
    end_time: "12:30",
    reason: "Entrega de comida",
    visitor: "John",
    house: 2,
  },
];

const requestTags = ["reason", "state"];
const requestSearch = ["reason"];
const requestSorter = ["request_date", "start_time", "end_time"];
const requestFiltersOn = ["state"];

const RequestList = () => {
  return (
    <DashboardLayout>
      <SectionIntro title="Lista de solicitudes" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        <RequestTable />
      </div>
    </DashboardLayout>
  );
};

export const RequestTable = () => {
  return (
    <TableComponent
      data={requestData}
      addTagsOn={requestTags}
      addSearchOn={requestSearch}
      addSortOn={requestSorter}
      addFiltersOn={requestFiltersOn}
    />
  );
};

export default RequestList;
