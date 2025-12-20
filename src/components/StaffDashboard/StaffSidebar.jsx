import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const StaffSidebar = ({ open, setOpen }) => {
  const { dark } = useContext(ThemeContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-primary text-white"
      : `
        block px-4 py-3 rounded-lg transition
        ${dark ? "hover:bg-[#1E1E1E] text-gray-200" : "hover:bg-gray-100 text-gray-800"}
      `;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static z-50 w-64 min-h-screen p-5 border-r transition-all duration-300
          ${dark
            ? "bg-[#0B0B0B] border-[#1F1F1F] text-gray-200"
            : "bg-white border-gray-200 text-gray-900"}
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-extrabold text-primary mb-8">
          CityFix
          <span
            className={`block text-sm ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Staff Dashboard
          </span>
        </h1>

        <nav className="space-y-2">
          <NavLink to="/staff" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/staff/issues" className={linkClass}>
            Assigned Issues
          </NavLink>
          <NavLink to="/staff/profile" className={linkClass}>
            Profile
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default StaffSidebar;
