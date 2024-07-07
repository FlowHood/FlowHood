import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const createAnonymousRequest = async (requestData) => {
    try {
      console.log("Request data:", requestData);
      const res = await axios.post("/request/create-anonymous", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });
      console.log("Request created:", res.data);
      toast.success("Ingreso anónimo creado correctamente");
      return res.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error(error);
      toast.error(errorMessage);
    }
  };

  export const sendQr = async (requestData) => {
    try {
      console.log("Request data:", requestData);
      const res = await axios.post("/qr/read", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });
      console.log("QR request sent:", res.data);
      toast.success("QR enviado correctamente");
      return res.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error(error);
      toast.error(errorMessage);
    }
  };