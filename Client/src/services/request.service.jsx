import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const createRequest = async (requestData) => {
  try {
    console.log("Request data:", requestData);
    const res = await axios.post("/request/", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("Request created:", res.data);
    toast.success("Request created successfully");
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const getAllRequests = async () => {
  try {
    const res = await axios.get("request/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    const data = res.data.data.map((request) => ({
      id: request.id,
      visitante: request.visitor.name + " " + request.visitor.email,
      residente: request.resident.name + " " + request.resident.email,
      fecha_inicio: request.startDate + " " + request.startTime,
      estado_solicitud: request.status,
      
      resident: request.resident,
      visitor: request.visitor,
      house: request.house,
      reason: request.reason,
    }));
    return data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const getAllRequestsInMyHouse = async () => {
  try {
    const res = await axios.get("request/my-house-requests", {
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

export const getAllRequestsByVisitor = async () => {
  try {
    const res = await axios.get("request/my-visitor-requests", {
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

export const getRequestById = async (id) => {
  try {
    const res = await axios.get(`request/my-house/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    return res.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
    return null;
  }
};

export const updateStatusRequest = async (id, status) => {
  try {
    let res;
    if (status === "ACT") {
      res = await axios.post(
        `request/accept/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        },
      );
      toast.success("Request accepted successfully");
    } else {
      res = await axios.post(
        `request/reject/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        },
      );
      toast.success("Request rejected successfully");
    }
    return res.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
};

export const generateQRRequest = async (requestId = null) => {
  try {
    const url = requestId ? `qr/request-qr/${requestId}` : "qr/request-qr";
    const res = await axios.post(url, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    console.log("QR data:", res);
    return res.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
    throw error;
  }
};
