import React from "react";
import DashboardLayout from "./DashboardLayout";
import QuickAction from "../QuickAction";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <QuickAction />
      <h1>Admin Dashboard</h1>
    </DashboardLayout>
  );
};

export default AdminDashboard;
