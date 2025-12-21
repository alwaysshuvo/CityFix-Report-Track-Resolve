import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import useRole from "../../hooks/useRole";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { role, loading: roleLoading } = useRole();

  const [dbUser, setDbUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load DB user info (premium check)
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then(res => setDbUser(res.data));
    }
  }, [user]);

  // Detect outside click
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
      ? `
      font-semibold
      ${dark ? "text-purple-300 border-b-2 border-purple-300"
            : "text-black border-b-2 border-blue-600"}
      pb-1
    `
      : `
      ${dark ? "text-gray-300 hover:text-purple-300"
            : "text-black hover:text-blue-600"}
      transition
    `;

  const getDashboardPath = () => {
    if (role === "admin") return "/admin";
    if (role === "staff") return "/staff";
    return "/dashboard";
  };

  /* =====================================
     CUSTOM ROLE LABEL WITH PREMIUM 👇
  ======================================*/
  let userRoleLabel = role || "user";

  if (dbUser?.role === "citizen" && dbUser?.premium === true) {
    userRoleLabel = "Premium Citizen";
  } else if (dbUser?.role === "citizen") {
    userRoleLabel = "Citizen";
  } else if (dbUser?.role === "staff") {
    userRoleLabel = "Staff";
  } else if (dbUser?.role === "admin") {
    userRoleLabel = "Admin";
  }

  return (
    <div className={`
        fixed top-0 left-0 right-0 z-50
        shadow-md backdrop-blur transition
        ${dark ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10" />
            <span className="text-2xl font-extrabold">
              <span className={`${dark ? "text-purple-300" : "text-blue-600"}`}>City</span>
              <span className={`${dark ? "text-purple-400" : "text-indigo-700"}`}>Fix</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
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

          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            className={`
              btn btn-ghost btn-circle transition
              ${dark ? "hover:bg-[#222]" : "hover:bg-gray-100"}
            `}
          >
            {dark ? <Sun className="size-5 text-yellow-400" /> : <Moon className="size-5 text-gray-700" />}
          </button>

          {/* Guest UI */}
          {!user && (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
            </div>
          )}

          {/* Logged User */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle avatar">
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
                    className={`
                      absolute right-0 mt-3 w-64 p-4 rounded-xl shadow-xl z-50 text-sm border
                      ${dark ? "bg-[#171717] border-[#2A2A2A] text-gray-200" : "bg-white border-gray-200 text-gray-800"}
                    `}
                  >
                    <p className="font-semibold">{user.displayName || "CityFix User"}</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{user.email}</p>

                    {/* ROLE BADGE WITH PREMIUM */}
                    {!roleLoading && (
                      <span className={`
                        inline-block mb-3 text-xs px-2 py-1 rounded capitalize
                        ${dbUser?.premium
                          ? "bg-yellow-300 text-black"
                          : "bg-blue-100 text-blue-600"}
                      `}>
                        {userRoleLabel}
                      </span>
                    )}

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setOpen(false)}
                      className={`
                        block px-3 py-2 rounded-md transition
                        ${dark ? "hover:bg-[#232323]" : "hover:bg-gray-100"}
                      `}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                      className={`
                        block w-full px-3 py-2 text-red-600 rounded-md transition
                        ${dark ? "hover:bg-red-900/40" : "hover:bg-red-50"}
                      `}
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
