import React, { useEffect, useState, createContext, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (access_token) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        },
      );
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const verifyToken = async (access_token) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`,
      );
      console.log("Token VERIFY", res.data);
      return res.data;
    } catch (error) {
      console.error("Token is invalid or expired", error);
      logout();
      return null;
    }
  };

  const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) {
      logout();
      return null;
    }
    try {
      const res = await axios.post(
        "https://www.googleapis.com/oauth2/v1/token",
        null,
        {
          params: {
            client_id: import.meta.env.VITE_CLIEND_ID,
            client_secret: import.meta.env.VITE_CLIEND_SECRET,
            refresh_token: refresh_token,
            grant_type: "refresh_token",
          },
        },
      );
      console.log("Refresh token response", res.data);
      const { access_token, expires_in } = res.data;
      const expirationTime = new Date().getTime() + expires_in * 1000;

      localStorage.setItem("session", access_token);
      localStorage.setItem("token_expiration", expirationTime.toString());
      fetchUserData(access_token);

      return access_token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  const formatTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses son indexados desde 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const checkAndRefreshToken = async () => {
    const expirationTime = localStorage.getItem("token_expiration");
    //console.log("Expiration time", expirationTime, "Current time", new Date().getTime());
    const currentTime = new Date().getTime();

    const expirationDate = new Date(parseInt(expirationTime));
    const currentDate = new Date();
    console.log(
      "Expiration time",
      formatTime(expirationDate),
      "Current time",
      formatTime(currentDate),
    );

    if (expirationTime && currentTime > expirationTime) {
      // parseInt(expirationTime, 10)
      return await refreshAccessToken();
    }
    return localStorage.getItem("session");
  };

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = await checkAndRefreshToken();
      console.log("my token is " ,token);
      if (token) {
        console.log("Token is valid");
        const tokenInfo = await verifyToken(token);
        if (tokenInfo) {
          console.log("Token info is valid");
          fetchUserData(token);
        }
      } else {
        console.log("Token is invalid" ,token);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          console.log("User is stored");
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    checkToken();
    // const interval = setInterval(checkAndRefreshToken, 60 * 60 * 1000); // 1 hour
    // return () => clearInterval(interval);
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token, expires_in, refresh_token } = tokenResponse;
      console.log("Login success", tokenResponse);
      const expirationTime = new Date().getTime() + expires_in * 1000;

      localStorage.setItem("session", access_token);
      localStorage.setItem("token_expiration", expirationTime.toString());
      localStorage.setItem("refresh_token", refresh_token);

      fetchUserData(access_token);
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const logout = () => {
    console.log("!! Logout");
    localStorage.removeItem("session");
    localStorage.removeItem("token_expiration");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
