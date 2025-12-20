import { Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import UserDashboardSidebar from "../components/UserDashboard/UserDashboardSidebar";
import UserDashboardNavbar from "../components/UserDashboard/UserDashboardNavbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { ThemeContext } from "../provider/ThemeContext";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`
        min-h-screen flex transition-all duration-300
        ${dark ? "bg-[#0B0B0B] text-white" : "bg-gray-100 text-gray-900"}
      `}
    >
      <ScrollToTop />

      {/* Sidebar */}
      <UserDashboardSidebar open={open} setOpen={setOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <UserDashboardNavbar setOpen={setOpen} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
