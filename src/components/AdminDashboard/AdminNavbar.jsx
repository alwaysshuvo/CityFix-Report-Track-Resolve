import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { Sun, Moon } from "lucide-react";

const AdminNavbar = ({ setOpen }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`
        h-16 flex items-center justify-between px-4 md:px-6 border-b
        transition-colors duration-300
        ${dark ? "bg-[#111] border-[#2c2c2c] text-gray-200" : "bg-white border-gray-200 text-gray-900"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          className={`
            lg:hidden btn btn-ghost btn-sm
            ${dark ? "hover:bg-[#222]" : "hover:bg-gray-100"}
          `}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <span
          className={`text-xl font-bold ${
            dark ? "text-purple-400" : "text-indigo-600"
          }`}
        >
          Admin Panel
        </span>
      </div>

      {/* RIGHT  */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            btn btn-ghost btn-circle
            ${dark ? "hover:bg-[#222]" : "hover:bg-gray-100"}
          `}
        >
          {dark ? (
            <Sun className="size-5 text-yellow-400" />
          ) : (
            <Moon className="size-5 text-gray-700" />
          )}
        </button>

        <Link
          to="/"
          className={`
            text-sm font-medium transition
            ${dark ? "hover:text-purple-300" : "hover:text-indigo-600"}
          `}
        >
          Go to Website
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
