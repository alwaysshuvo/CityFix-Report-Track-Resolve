import { NavLink } from "react-router-dom";

const AdminSidebar = ({ open, setOpen }) => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-primary text-white"
      : "block px-4 py-3 rounded-lg hover:bg-base-200";

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-50 w-64 min-h-screen bg-base-200 p-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <h1 className="text-2xl font-extrabold text-primary mb-8">
          CityFix
          <span className="block text-sm text-gray-500">
            Admin Dashboard
          </span>
        </h1>

        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/issues" className={linkClass}>Manage Issues</NavLink>
          <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
          <NavLink to="/admin/staff" className={linkClass}>Manage Staff</NavLink>
          <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
