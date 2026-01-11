import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import useRole from "../../hooks/useRole";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { role, loading: roleLoading } = useRole();

  const [dbUser, setDbUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_BASE}/users/${user.email}`)
        .then((res) => setDbUser(res.data));
    }
  }, [user]);

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
    `relative font-medium transition ${
      isActive
        ? dark
          ? "text-primary"
          : "text-primary"
        : dark
        ? "text-gray-300 hover:text-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  const getDashboardPath = () =>
    role === "admin" ? "/admin" : role === "staff" ? "/staff" : "/dashboard";

  let userRoleLabel = role || "user";
  if (dbUser?.role === "citizen" && dbUser?.premium)
    userRoleLabel = "Premium Citizen";
  if (dbUser?.role === "citizen" && !dbUser?.premium) userRoleLabel = "Citizen";
  if (dbUser?.role === "staff") userRoleLabel = "Staff";
  if (dbUser?.role === "admin") userRoleLabel = "Admin";

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b shadow-[0_4px_30px_rgba(0,0,0,0.05)]
  ${
    dark
      ? "bg-[#0B1220]/80 border-white/10 text-white"
      : "bg-gradient-to-r from-blue-50/80 via-white/60 to-indigo-50/80 border-blue-100 text-gray-900"
  }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobile(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-primary/10"
          >
            <Menu />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" className="w-9 h-9" />
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-primary">City</span>
              <span className="text-secondary">Fix</span>
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-issues" className={navLinkClass}>
            All Issues
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/faq" className={navLinkClass}>
            FAQ
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-primary/10 transition"
          >
            {dark ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>

          {!user && (
            <div className="hidden sm:flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-primary/10"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-9 h-9 rounded-full border"
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 mt-3 w-64 rounded-xl p-4 shadow-xl border
                    ${
                      dark
                        ? "bg-[#111] border-white/10"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <p className="font-semibold">
                      {user.displayName || "CityFix User"}
                    </p>
                    <p className="text-xs opacity-60">{user.email}</p>

                    {!roleLoading && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                        {userRoleLabel}
                      </span>
                    )}

                    <div className="mt-4 space-y-1">
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-primary/10"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          logoutUser();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            className={`fixed inset-y-0 right-0 w-72 p-6 z-50 shadow-xl
            ${dark ? "bg-[#0B0B0B]" : "bg-white"}`}
          >
            <button onClick={() => setMobile(false)} className="mb-6">
              <X />
            </button>

            <nav className="flex flex-col gap-5 text-lg">
              <NavLink
                onClick={() => setMobile(false)}
                to="/"
                className={navLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setMobile(false)}
                to="/all-issues"
                className={navLinkClass}
              >
                All Issues
              </NavLink>
              <NavLink
                onClick={() => setMobile(false)}
                to="/contact"
                className={navLinkClass}
              >
                Contact
              </NavLink>
              <NavLink
                onClick={() => setMobile(false)}
                to="/faq"
                className={navLinkClass}
              >
                FAQ
              </NavLink>
              <NavLink
                onClick={() => setMobile(false)}
                to="/about"
                className={navLinkClass}
              >
                About
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
