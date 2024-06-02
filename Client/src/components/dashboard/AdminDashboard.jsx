import React from "react";
import DashboardLayout from "./DashboardLayout";
import QuickAction from "../QuickAction";
import ChartsContainer from "./ChartsContainer";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <QuickAction />
      <ChartsContainer />
    </DashboardLayout>
  );
};

export default AdminDashboard;
