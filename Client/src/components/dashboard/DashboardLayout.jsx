import React from "react";
import { Container } from "../Container";
import SideBar from "./Sidebar";
import NavigatorBar from "./NavigatorBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen flex-1 sm:grid-cols-[auto,1fr]   ">
      <SideBar />
      <div className="bg-[#f2f1ff]/[.30]">
        <NavigatorBar />
        <Container className="mt-20 overflow-x-hidden p-8 pt-0">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;
