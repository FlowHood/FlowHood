import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";

const houseData = [
  {
    key: "1",
    house_number: "1",
    address: "123 Main St",
    owner_name: "John Doe",
    residents: 4,
  },
  {
    key: "2",
    house_number: "2",
    address: "456 Maple Ave",
    owner_name: "Jane Smith",
    residents: 3,
  },
  {
    key: "3",
    house_number: "3",
    address: "789 Oak Dr",
    owner_name: "Mary Johnson",
    residents: 5,
  },
];

const houseTags = ["owner_name"];
const houseSearch = ["address", "owner_name"];
const houseSorter = ["house_number", "inhabitants"];
const houseFiltersOn = ["owner_name"];

const HouseList = () => {
  return (
    <DashboardLayout>
      <SectionIntro title="Lista de casas" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        <HouseTable />
      </div>
    </DashboardLayout>
  );
};

export const HouseTable = () => {
  return (
    <TableComponent
      data={houseData}
      addTagsOn={houseTags}
      addSearchOn={houseSearch}
      addSortOn={houseSorter}
      addFiltersOn={houseFiltersOn}
    />
  );
};

export default HouseList;
