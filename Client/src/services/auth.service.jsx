import axios from "axios";
import { toast } from "sonner";
import { handleError } from "../lib/utils/errorHandler";

export const loginUserToGoogle = async (user) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginToApi = async (tokenGoogle) => {
  try {
    const res = await axios.post("auth/login", { token: tokenGoogle });
    const token = res.data.data.token;
    return token;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
}
export const getMe = async () => {
  try {
    const res = await axios.get("auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });
    
    const user = res.data.data;
    return user;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error(error);
    toast.error(errorMessage);
  }
}