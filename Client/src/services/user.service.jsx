import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });

    return res.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axios.get("users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    const data = response.data.data.map((user) => ({
      id: user.id,
      picture: user.picture,
      name: user.name,
      email: user.email,
      estado: user.state === "ACT" ? "Activo" : "Inactivo",
      roles: user.roles.map((role) => role.name).join(", "),
      houses: user.houses,
      admHouses: user.admHouses,
    }));
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching user data:", error);
    toast.error(errorMessage);
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    const data = {
      id: response.data.data.id,
      picture: response.data.data.picture,
      name: response.data.data.name,
      lastname: response.data.data.lastname,
      email: response.data.data.email,
      estado: response.data.data.state,
      roles: response.data.data.roles.map((role) => role.id),
      houses: response.data.data.houses,
      admHouses: response.data.data.admHouses,
    };
    console.log({ data });

    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching user data:", error);
    toast.error(errorMessage);
  }
};

export const updateUserById = async (id, data) => {
  try {
    const res = await axios.post(`users/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("User updated:", res.data);
    toast.success("Usuario actualizado correctamente");
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching user data:", error);
    toast.error(errorMessage);
  }
};

export const toggleRole = async (userId, roleId) => {
  try {
    const res = await axios.patch(`users/${userId}/rol/${roleId}`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("User updated:", res.data);
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching user data:", error);
    toast.error(errorMessage);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });

    toast.success("Usuario deshabilitado correctamente");

    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};
