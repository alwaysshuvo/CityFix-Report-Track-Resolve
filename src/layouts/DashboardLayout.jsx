// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
