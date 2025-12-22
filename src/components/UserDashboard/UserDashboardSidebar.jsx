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
      title: "Logout?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await logoutUser();
        navigate("/login");
        Swal.fire("Logged Out!", "", "success");
      }
    });
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? `flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white font-semibold shadow-md`
      : `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
        ${
          dark
            ? "text-gray-300 hover:bg-[#1e1e1e] hover:text-white"
            : "text-gray-700 hover:bg-gray-100"
        }
      `;

  return (
    <aside
      className={`
        w-64 hidden md:flex flex-col p-6 transition-all duration-300
        ${
          dark
            ? "bg-[#0e0e0e] text-gray-200 border-r border-[#222]"
            : "bg-white text-gray-900 border-r border-gray-200"
        }
      `}
    >
      <div className="flex items-center gap-2 mb-10">
        <img src="/logo.png" alt="logo" className="w-9 h-9" />
        <h2 className="text-2xl font-extrabold text-primary">CityFix</h2>
      </div>

      <nav className="space-y-2 font-medium">
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
            flex items-center gap-3 px-4 py-3 rounded-lg mt-4 font-semibold
            transition-all
            ${
              dark
                ? "text-red-400 hover:bg-[#330000] hover:text-red-300"
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
