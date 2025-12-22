import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";
import { FiX, FiLogOut } from "react-icons/fi";

const StaffSidebar = ({ open, setOpen }) => {
  const { dark } = useContext(ThemeContext);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-primary text-white font-medium"
      : `
        block px-4 py-3 rounded-lg font-medium transition
        ${
          dark
            ? "hover:bg-[#1E1E1E] text-gray-300"
            : "hover:bg-gray-100 text-gray-800"
        }
      `;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50 top-0 left-0 w-64 h-full p-5 border-r 
          flex flex-col transition-all duration-300 ease-in-out
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${
            dark
              ? "bg-[#0B0B0B] border-[#1F1F1F] text-gray-200"
              : "bg-white border-gray-200 text-gray-900"
          }
        `}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden self-end mb-4 p-2 rounded-md border border-gray-500/30"
          onClick={() => setOpen(false)}
        >
          <FiX size={22} />
        </button>

        <h1 className="text-2xl font-extrabold text-primary mb-10 leading-tight">
          CityFix
          <span
            className={`block text-sm mt-1 ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Staff Dashboard
          </span>
        </h1>

        <nav className="space-y-3 flex-1">
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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            mt-6 flex items-center gap-2 px-4 py-3 rounded-lg font-medium border
            ${dark 
              ? "border-[#444] text-red-400 hover:bg-[#220000]" 
              : "border-red-500 text-red-600 hover:bg-red-100"
            }
          `}
        >
          <FiLogOut size={18} /> Logout
        </button>
      </aside>
    </>
  );
};

export default StaffSidebar;
