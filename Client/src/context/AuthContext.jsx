import React, { useEffect, useState, createContext } from "react";
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
      return res.data;
    } catch (error) {
      console.error("Token is invalid or expired", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("session");
      if (token) {
        const tokenInfo = await verifyToken(token);
        if (tokenInfo) {
          fetchUserData(token);
        }
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token, expires_in, refresh_token } = tokenResponse;
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
