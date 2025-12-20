import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const AdminSidebar = ({ open, setOpen }) => {
  const { dark } = useContext(ThemeContext);

  const linkClass = ({ isActive }) =>
    `
      block px-4 py-3 rounded-lg font-medium transition-colors
      ${
        isActive
          ? dark
            ? "bg-purple-600 text-white shadow"
            : "bg-indigo-600 text-white shadow"
          : dark
          ? "text-gray-300 hover:bg-[#1d1d1d]"
          : "text-gray-700 hover:bg-gray-100"
      }
    `;

  return (
    <>
      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static z-50 w-64 min-h-screen p-5 transition-transform duration-300
          border-r
          ${
            dark
              ? "bg-[#111] border-[#2b2b2b] text-gray-200"
              : "bg-white border-gray-200 text-gray-900"
          }
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* LOGO / TITLE */}
        <h1 className="text-2xl font-extrabold mb-8">
          <span className={dark ? "text-purple-400" : "text-indigo-600"}>
            CityFix
          </span>
          <span
            className={`block text-sm ${
              dark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Admin Dashboard
          </span>
        </h1>

        {/* NAV */}
        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/issues" className={linkClass}>
            Manage Issues
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            Users
          </NavLink>
          <NavLink to="/admin/staff" className={linkClass}>
            Manage Staff
          </NavLink>
          <NavLink to="/admin/payments" className={linkClass}>
            Payments
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
