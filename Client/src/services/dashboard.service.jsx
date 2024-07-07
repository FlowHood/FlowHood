import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get("dashboard/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Error fetching dashboard data:", error);
    toast.error(errorMessage);
  }
};
