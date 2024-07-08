import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";
import { capitalizeWords } from "../lib/utils";

export const createHouse = async (houseData) => {
  try {
    const res = await axios.post("house/", houseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("House created:", res.data);
    toast.success("Casas creada correctamente");
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const fetchHouseData = async () => {
  try {
    const response = await axios.get("house/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    const data = response.data.data.map((house) => ({
        id: house.id,
        address: house.address,
        owner_name: house.responsible ? capitalizeWords(house.responsible.name) : "N/A",
        residents: house.residents?.length || 0,
        residentsData: house.residents,
        responsible: house.responsible,
        estado: house.active ? "activo" : "inactivo",
    }));
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching house data:", error);
    toast.error(errorMessage);
  }
};

export const deleteHouse = async (id) => {
  try {
    const res = await axios.delete(`house/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("House deleted:", res.data);
    toast.success("Casas eliminada correctamente");
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const updateHouse = async (houseData, houseId) => {
  try {
    const res = await axios.put(`house/${houseId}`, houseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("House updated:", res.data);
    console.log("House updated:", res.data);
    toast.success("Casa actualizada correctamente");
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const getHouseById = async (houseId) => {
  try {
    const res = await axios.get(`house/${houseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    return res.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching house data:", error);
    toast.error(errorMessage);
  }
};
