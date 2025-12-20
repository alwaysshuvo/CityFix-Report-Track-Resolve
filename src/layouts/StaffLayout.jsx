import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/StaffDashboard/StaffSidebar";
import StaffNavbar from "../components/StaffDashboard/StaffNavbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { ThemeContext } from "../provider/ThemeContext";

const StaffLayout = () => {
  const [open, setOpen] = useState(false);
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`
        min-h-screen flex transition-all duration-300
        ${dark ? "bg-[#0B0B0B] text-white" : "bg-base-100 text-gray-900"}
      `}
    >
      <ScrollToTop />

      {/* Sidebar */}
      <StaffSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <StaffNavbar setOpen={setOpen} />
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
