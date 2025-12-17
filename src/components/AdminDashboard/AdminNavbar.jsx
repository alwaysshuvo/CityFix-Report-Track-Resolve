import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="h-16 bg-base-100 border-b flex items-center justify-between px-6 shadow-sm">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-primary">Admin Panel</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition"
        >
          Go to Website
        </Link>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              A
            </div>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44"
          >
            <li>
              <button className="w-full text-left px-3 py-2 hover:bg-base-200 rounded">
                Profile
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 hover:bg-base-200 rounded">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
