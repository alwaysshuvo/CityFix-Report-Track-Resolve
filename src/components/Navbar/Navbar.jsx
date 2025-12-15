import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary pb-1"
      : "font-medium text-gray-700 hover:text-primary transition";

  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10" />
            <span className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                City
              </span>
              <span className="text-primary">Fix</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 text-lg">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-issues" className={navLinkClass}>All Issues</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </ul>
        </div>

        <div className="navbar-end">

          {!user && (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-primary btn-sm px-5">Login</Link>
              <Link to="/register" className="btn btn-outline btn-sm px-5">Register</Link>
            </div>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-circle avatar"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 rounded-full"
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl p-4 z-50"
                  >
                    <p className="font-semibold">{user.displayName || "CityFix User"}</p>
                    <p className="text-sm text-gray-500 mb-3">{user.email}</p>

                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 text-red-500 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
