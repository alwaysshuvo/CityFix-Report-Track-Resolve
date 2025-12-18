// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../components/UserDashboard/UserDashboardSidebar";
import UserDashboardNavbar from "../components/UserDashboard/UserDashboardNavbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <ScrollToTop/>
      <UserDashboardSidebar />

      <div className="flex-1 flex flex-col">
        <UserDashboardNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
