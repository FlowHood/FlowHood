import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";
import { toast } from "sonner";
import { fetchUserData } from "../../services/user.service";

const userTags = [];
const userSearch = ["name", "email"];
const userSorter = ["name"];
const userFiltersOn = ["state", "roles"];

const UserList = () => {
  return (
    <DashboardLayout>
      <SectionIntro title="Lista de usuarios" />
      <div className="rounded-xl bg-white p-6 shadow-card">
        <UsersTable />
      </div>
    </DashboardLayout>
  );
};

export const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleEdit = (id) => {
    toast.info(`Editing user with ID: ${id}`);
    // Lógica para editar el usuario con el ID proporcionado
  };

  const handleDelete = (id) => {
    toast.error(`Deleting user with ID: ${id}`);
    // Lógica para eliminar el usuario con el ID proporcionado
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableComponent
      data={userData}
      addTagsOn={userTags}
      addSearchOn={userSearch}
      addSortOn={userSorter}
      addFiltersOn={userFiltersOn}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default UserList;
