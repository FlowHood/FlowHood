import React, { useEffect, useState, createContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { ROL } from "../lib/rol";
import { getMe, loginToApi } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([ROL.ADMIN]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("session");
      if (token) {
        const user = await getMe();
        setUser(user);
        if (user && user.roles) setRoles(user.roles.map((role) => role.id));
        else setRoles([]);
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      const token = await loginToApi(access_token);
      localStorage.setItem("session", token);

      if (token) {
        const user = await getMe();
        setUser(user);
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
    setRoles([]);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading, roles }}
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
