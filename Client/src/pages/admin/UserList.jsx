import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";

const usersData = [
  {
    key: "1",
    name: "activo",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "nice",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 102,
    address: "London No. 1 Lake Park",
    tags: "inactivo",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Conteo A",
    tags: "activo",
  },
];

const usersTags = ["age", "address", "tags"];
const usersSearch = ["address", "name"];
const usersSorter = ["age"];
const usersFiltersOn = ["tags"];

const UserList = () => {
  return (
    <DashboardLayout>
      <SectionIntro title="Lista de casas" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        <UsersTable />
      </div>
    </DashboardLayout>
  );
};

export const UsersTable = () => {
  return (
    <TableComponent
      data={usersData}
      addTagsOn={usersTags}
      addSearchOn={usersSearch}
      addSortOn={usersSorter}
      addFiltersOn={usersFiltersOn}
    />
  );
};

export default UserList;
