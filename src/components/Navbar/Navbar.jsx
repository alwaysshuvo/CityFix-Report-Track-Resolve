import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);

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
      ? "text-primary font-semibold border-b-2 border-primary pb-1 dark:text-[#C084FC] dark:border-[#C084FC]"
      : "font-medium text-gray-700 hover:text-primary transition dark:text-gray-300 dark:hover:text-[#C084FC]";

  return (
    <div
      className="
        fixed top-0 left-0 right-0 z-50 
        bg-white text-black shadow-sm 
        dark:bg-[#111] dark:text-[#E5E5E5] dark:shadow-[0_0_15px_rgba(168,85,247,0.25)]
        backdrop-blur
      "
    >
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10" />
            <span className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                City
              </span>
              <span className="text-primary dark:text-[#C084FC]">Fix</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 text-lg">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-issues" className={navLinkClass}>All Issues</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle hover:bg-gray-100 dark:hover:bg-[#1F1F1F] transition"
            title="Toggle Theme"
          >
            {dark ? (
              <Sun className="size-5 text-yellow-400" />
            ) : (
              <Moon className="size-5 text-gray-700" />
            )}
          </button>

          {/* Guest */}
          {!user && (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-primary btn-sm px-5 dark:bg-[#A855F7] dark:border-none dark:hover:bg-[#C084FC]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-sm px-5 dark:border-[#C084FC] dark:text-[#C084FC] dark:hover:bg-[#C084FC] dark:hover:text-white"
              >
                Register
              </Link>
            </div>
          )}

          {/* Logged In Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-circle avatar hover:bg-gray-100 dark:hover:bg-[#1F1F1F]"
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
                    className="
                      absolute right-0 mt-3 w-64 
                      bg-white text-black 
                      dark:bg-[#141414] dark:text-[#E5E5E5] 
                      rounded-xl shadow-xl 
                      border border-gray-200 dark:border-[#1F1F1F]
                      p-4 z-50
                    "
                  >
                    <p className="font-semibold dark:text-white">
                      {user.displayName || "CityFix User"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {user.email}
                    </p>

                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="
                        block px-3 py-2 rounded-md 
                        hover:bg-gray-100 dark:hover:bg-[#1F1F1F] 
                        transition
                      "
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                      className="
                        w-full text-left px-3 py-2 rounded-md text-red-600 
                        hover:bg-red-50 dark:hover:bg-red-900/40 
                        transition
                      "
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
