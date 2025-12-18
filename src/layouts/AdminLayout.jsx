import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";


const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-base-100">

      <AdminSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar setOpen={setOpen} />
        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
