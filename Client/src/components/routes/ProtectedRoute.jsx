import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading";

const ProtectedRoute = ({ allowedRoles, component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (!user) {
    toast.error("You must be logged in to view this page");
    return <Navigate to="/login" />;
  }

  const userRoles = user.roles.map((role) => role.id);

  const hasPermission = allowedRoles.some(role => userRoles.includes(role));

  if (!hasPermission) {
    toast.error("You do not have permission to view this page");
    return <Navigate to="/" />;
  }

  return Component ? <Component /> : <Outlet />;
};

export default ProtectedRoute;
