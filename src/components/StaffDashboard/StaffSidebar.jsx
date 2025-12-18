import { NavLink } from "react-router-dom";

const StaffSidebar = ({ open, setOpen }) => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-primary text-white"
      : "block px-4 py-3 rounded-lg hover:bg-base-200";

  return (
    <>
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
