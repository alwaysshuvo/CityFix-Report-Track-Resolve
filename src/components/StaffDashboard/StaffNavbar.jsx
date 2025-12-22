import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaHome } from "react-icons/fa"; // 🏠 NEW

const StaffNavbar = ({ setOpen }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`
        h-14 sm:h-16 flex items-center justify-between
        px-3 sm:px-5 md:px-6 border-b
        transition-all duration-300 sticky top-0 z-20
        ${
          dark
            ? "bg-[#0B0B0B] text-white border-[#222]"
            : "bg-white text-gray-900 border-gray-200"
        }
      `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setOpen(true)}
          className={`
            lg:hidden p-2 rounded-md text-lg
            ${dark ? "text-white hover:bg-[#1a1a1a]" : "text-gray-800 hover:bg-gray-100"}
          `}
        >
          ☰
        </button>

        <span className="text-lg sm:text-xl font-extrabold truncate text-primary">
          Staff Panel
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            p-2 rounded-full border transition-all duration-200 text-lg
            ${dark ? "border-[#444] hover:bg-[#1a1a1a]" : "border-gray-300 hover:bg-gray-100"}
          `}
          aria-label="Toggle Theme"
        >
          {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* CityFix Home Button (NEW) */}
        <Link
          to="/"
          className={`
            flex items-center gap-2 text-xs sm:text-sm font-medium rounded-md px-3 py-1.5
            transition hover:scale-105
            ${
              dark
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }
          `}
        >
          <FaHome size={14} />
          <span className="hidden sm:inline">CityFix Home</span>
        </Link>
      </div>
    </header>
  );
};

export default StaffNavbar;
