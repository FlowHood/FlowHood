import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("users/");

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
      roles: user.roles.map(role => role.name).join(", "),
    }));
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching user data:", error);
    toast.error(errorMessage);
  }
};