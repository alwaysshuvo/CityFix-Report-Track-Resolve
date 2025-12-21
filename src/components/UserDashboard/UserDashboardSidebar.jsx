import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";
import {
  LayoutDashboard,
  FilePlus,
  ListChecks,
  User,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";

const UserDashboardSidebar = () => {
  const { dark } = useContext(ThemeContext);
 const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutUser();
        navigate("/login");
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? `
        flex items-center gap-3 px-4 py-3 rounded-lg
        bg-primary text-white font-semibold
      `
      : `
        flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          dark
            ? "text-gray-300 hover:bg-[#222]"
            : "text-gray-700 hover:bg-gray-200"
        }
      `;

  return (
    <aside
      className={`
        w-64 p-5 hidden md:block transition-all duration-300 shadow-lg
        ${
          dark
            ? "bg-[#0B0B0B] text-white shadow-none border-r border-[#222]"
            : "bg-white text-gray-900"
        }
      `}
    >
      <h2 className="text-2xl font-extrabold mb-8 text-primary">CityFix</h2>

      <nav
        className={`
          space-y-2 font-medium
          ${dark ? "text-gray-300" : "text-gray-700"}
        `}
      >
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink to="/dashboard/my-issues" className={linkClass}>
          <ListChecks size={20} /> My Issues
        </NavLink>

        <NavLink to="/dashboard/report-issue" className={linkClass}>
          <FilePlus size={20} /> Report Issue
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <User size={20} /> Profile
        </NavLink>

        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg w-full font-semibold
            transition
            ${
              dark
                ? "text-red-400 hover:bg-[#220000]"
                : "text-red-600 hover:bg-red-50"
            }
          `}
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default UserDashboardSidebar;
