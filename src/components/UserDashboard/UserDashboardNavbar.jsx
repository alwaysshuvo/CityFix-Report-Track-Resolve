import { Link } from "react-router-dom";
import { Bell, Sun, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const UserDashboardNavbar = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_BASE}/users/${user.email}`)
        .then((res) => setDbUser(res.data))
        .catch(() => {});
    }
  }, [user]);

  // Dynamic role label
  let roleLabel = "User";
  if (dbUser?.role === "admin") roleLabel = "Admin";
  else if (dbUser?.role === "staff") roleLabel = "Staff";
  else if (dbUser?.role === "citizen" && dbUser?.premium) roleLabel = "Premium Citizen";
  else if (dbUser?.role === "citizen") roleLabel = "Citizen";

  return (
    <header
      className={`h-16 sm:h-18 px-4 sm:px-6 flex items-center justify-between shadow-md border-b transition 
      ${dark ? "bg-[#0e0e0e] border-[#222] text-white" : "bg-white border-gray-200 text-gray-900"}`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-primary hover:opacity-80 transition"
        >
          <img src="/logo.png" className="w-7 h-7 sm:w-8 sm:h-8" alt="logo" />
          <span className="hidden sm:block">CityFix</span>
        </Link>

        <span
          className={`hidden sm:block ${
            dark ? "text-gray-500" : "text-gray-600"
          }`}
        >
          / Dashboard
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <Bell
          size={20}
          className={`cursor-pointer hover:scale-110 transition ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition hover:scale-105
          ${
            dark
              ? "bg-[#222] border-[#444] text-yellow-400"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* USER INFO */}
        <div className="flex items-center gap-2">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/40"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border object-cover"
            alt="user"
          />

          <div className="hidden sm:block text-sm leading-tight">
            <p className="font-semibold truncate max-w-[140px]">
              {user?.displayName || "User"}
            </p>
            <p
              className={`text-xs truncate max-w-[160px] ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {user?.email}
            </p>

            <span
              className={`mt-1 inline-block text-[10px] px-2 py-[2px] rounded font-semibold
              ${
                dbUser?.premium
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-300 text-black"
              }`}
            >
              {roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserDashboardNavbar;
