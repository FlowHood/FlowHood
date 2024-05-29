import axios from "axios";

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
