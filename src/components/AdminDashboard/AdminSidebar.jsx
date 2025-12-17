import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white"
      : "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition";

  return (
    <aside className="w-64 min-h-screen bg-base-200 p-5">
      
      <h1 className="text-2xl font-extrabold text-primary mb-8">
        CityFix
        <span className="text-sm font-medium block text-gray-500">
          Admin Dashboard
        </span>
      </h1>

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

        <NavLink to="/admin/payments" className={linkClass}>
          Payments
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
