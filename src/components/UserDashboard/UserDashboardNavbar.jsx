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

  // Load MongoDB user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setDbUser(res.data));
    }
  }, [user]);

  // Determine label
  let roleLabel = "User";
  if (dbUser?.role === "admin") roleLabel = "Admin";
  else if (dbUser?.role === "staff") roleLabel = "Staff";
  else if (dbUser?.role === "citizen" && dbUser?.premium) roleLabel = "Premium Citizen";
  else if (dbUser?.role === "citizen") roleLabel = "Citizen";

  return (
    <header
      className={`h-16 px-6 flex items-center justify-between shadow transition
      ${dark ? "bg-[#111] text-white" : "bg-white text-gray-900"}`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary">
          <img src="/logo.png" className="w-8 h-8" alt="logo" />
          CityFix
        </Link>
        <span className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
          / Dashboard
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <Bell
          className={`cursor-pointer transition ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition
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
            className="w-9 h-9 rounded-full border"
            alt="user"
          />
          <div className="text-sm leading-tight">
            <p className="font-semibold">{user?.displayName || "User"}</p>
            <p
              className={`text-xs ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {user?.email}
            </p>
            {/* ROLE LABEL HERE */}
            <span
              className={`text-[10px] px-2 py-[1px] rounded mt-1 inline-block ${
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
