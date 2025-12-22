import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const StaffNavbar = ({ setOpen }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`
        h-14 sm:h-16 flex items-center justify-between
        px-3 sm:px-5 md:px-6 border-b
        transition-all duration-300 sticky top-0 z-20
        ${dark ? "bg-[#0B0B0B] text-white border-[#222]" : "bg-white text-gray-900 border-gray-200"}
      `}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Drawer Button */}
        <button
          onClick={() => setOpen(true)}
          className={`
            lg:hidden p-2 rounded-md text-lg
            ${dark ? "text-white hover:bg-[#1a1a1a]" : "text-gray-800 hover:bg-gray-100"}
          `}
        >
          ☰
        </button>

        <span
          className="
            text-lg sm:text-xl font-extrabold truncate
            text-primary
          "
        >
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

        {/* Go Home */}
        <Link
          to="/"
          className={`
            text-sm sm:text-base font-medium hidden xs:block transition
            hover:text-primary whitespace-nowrap
            ${dark ? "text-white" : "text-gray-800"}
          `}
        >
          Go to Website
        </Link>
      </div>
    </header>
  );
};

export default StaffNavbar;
