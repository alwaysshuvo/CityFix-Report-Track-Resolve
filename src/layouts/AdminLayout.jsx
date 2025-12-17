import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";


const AdminLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[256px_1fr]">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content Area */}
      <div className="flex flex-col">
        <AdminNavbar />
        <main className="p-8 bg-base-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
