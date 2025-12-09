import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "font-medium hover:text-primary transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-issues"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "font-medium hover:text-primary transition"
          }
        >
          All Issues
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "font-medium hover:text-primary transition"
          }
        >
          Contact
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "font-medium hover:text-primary transition"
          }
        >
          FAQ
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "font-medium hover:text-primary transition"
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="CityFix Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                City
              </span>
              <span className="text-primary">Fix</span>
            </span>
          </Link>

          <div className="dropdown lg:hidden ml-2">
            <label tabIndex={0} className="btn btn-ghost p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow w-48 mt-3"
            >
              {navLinks}
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium gap-4">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end">
          <Link to="/login" className="btn btn-primary btn-sm px-5">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
