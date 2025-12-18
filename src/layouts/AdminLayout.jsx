import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">

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
