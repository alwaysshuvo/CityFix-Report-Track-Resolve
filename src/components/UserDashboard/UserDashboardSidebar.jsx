// src/components/dashboard/DashboardSidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  ListChecks,
  User,
  LogOut,
} from "lucide-react";

const UserDashboardSidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg"
      : "flex items-center gap-3 px-4 py-3 hover:bg-gray-200 rounded-lg";

  return (
    <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
      <h2 className="text-2xl font-extrabold mb-8 text-primary">
        CityFix
      </h2>

      <nav className="space-y-2 text-gray-700 font-medium">
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink to="/dashboard/my-issues" className={linkClass}>
          <ListChecks size={20} /> My Issues
        </NavLink>

        <NavLink to="/dashboard/report-issue" className={linkClass}>
          <FilePlus size={20} /> Report Issue
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <User size={20} /> Profile
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full">
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default UserDashboardSidebar;
