// src/components/dashboard/DashboardNavbar.jsx
import { Link } from "react-router-dom";
import { Bell, Home } from "lucide-react";

const UserDashboardNavbar = () => {
  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-bold hover:opacity-80"
        >
          <img src="/public/logo.png" alt="LOgo" className="w-[30px] h-[30px]" />
          CityFix
        </Link>

        <span className="text-gray-400">/ Dashboard</span>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-gray-600 hover:text-primary" />

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full border"
          />
          <div className="text-sm leading-tight">
            <p className="font-semibold">User Name</p>
            <p className="text-gray-500 text-xs">user@email.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserDashboardNavbar;
