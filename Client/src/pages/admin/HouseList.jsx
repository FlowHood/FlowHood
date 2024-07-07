import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { TableComponent } from "../../components/table/GeneralTable";
import SectionIntro from "../../components/SectionIntro";
import { fetchHouseData } from "../../services/house.service";
import { toast } from "sonner";
import GeneralButton from "../../components/buttons/GeneralButton";
import Button from "../../components/buttons/Button";
import { Link } from "react-router-dom";
import { VIEWS } from "../../lib/views";

const houseTags = ["owner_name"];
const houseSearch = ["address", "owner_name"];
const houseSorter = ["house_number", "residents"];
const houseFiltersOn = ["estado"];

const HouseList = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <SectionIntro title="Lista de casas" />
        <Button
          as={Link}
          to={VIEWS.createHouse}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Crear casa
        </Button>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-card">
        <HouseTable />
      </div>
    </DashboardLayout>
  );
};

export const HouseTable = () => {
  const [houseData, setHouseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouseData = async () => {
      try {
        const data = await fetchHouseData();
        setHouseData(data);
      } catch (error) {
        console.error("Error loading house data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHouseData();
  }, []);

  const handleEdit = (id) => {
    toast.info(`Editing house with ID: ${id}`);
    // Lógica para editar la casa con el ID proporcionado
  };

  const handleDelete = (id) => {
    toast.error(`Deleting house with ID: ${id}`);
    // Lógica para eliminar la casa con el ID proporcionado
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableComponent
      data={houseData}
      addTagsOn={houseTags}
      addSearchOn={houseSearch}
      addSortOn={houseSorter}
      addFiltersOn={houseFiltersOn}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default HouseList;
