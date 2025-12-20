import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const StaffNavbar = ({ setOpen }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`
        h-16 border-b flex items-center justify-between px-4 md:px-6
        transition-all duration-300
        ${dark ? "bg-[#0B0B0B] text-white border-[#222]" : "bg-white text-gray-900 border-gray-200"}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Mobile Drawer */}
        <button
          className={`lg:hidden btn btn-ghost btn-sm ${
            dark ? "text-white" : "text-gray-900"
          }`}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <span className="text-xl font-bold text-primary">
          Staff Panel
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`
            p-2 rounded-full border transition
            ${dark ? "border-[#444] text-white" : "border-gray-300 text-gray-700"}
            hover:opacity-80
          `}
        >
          {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <Link
          to="/"
          className={`
            text-sm font-medium transition
            hover:text-primary
            ${dark ? "text-white" : "text-gray-800"}
          `}
        >
          Go to Website
        </Link>
      </div>
    </div>
  );
};

export default StaffNavbar;
