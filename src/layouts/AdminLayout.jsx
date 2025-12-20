import { Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { ThemeContext } from "../provider/ThemeContext";

const AdminLayout = () => {
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
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar setOpen={setOpen} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
