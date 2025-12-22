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
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`${import.meta.env.VITE_API_BASE}/users/${user.email}`)
        .then(res => setDbUser(res.data));
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
    isActive
      ? `${dark ? "text-purple-300 border-b-2 border-purple-300" : "text-black border-b-2 border-blue-600"} font-semibold pb-1`
      : `${dark ? "text-gray-300 hover:text-purple-300" : "text-black hover:text-blue-600"} transition`;

  const getDashboardPath = () =>
    role === "admin" ? "/admin" : role === "staff" ? "/staff" : "/dashboard";

  let userRoleLabel = role || "user";
  if (dbUser?.role === "citizen" && dbUser?.premium) userRoleLabel = "Premium Citizen";
  if (dbUser?.role === "citizen" && !dbUser?.premium) userRoleLabel = "Citizen";
  if (dbUser?.role === "staff") userRoleLabel = "Staff";
  if (dbUser?.role === "admin") userRoleLabel = "Admin";

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} fixed top-0 w-full z-50 shadow-md backdrop-blur transition`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 justify-between">

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10" />
            <span className="text-2xl font-extrabold">
              <span className={dark ? "text-purple-300" : "text-blue-600"}>City</span>
              <span className={dark ? "text-purple-400" : "text-indigo-700"}>Fix</span>
            </span>
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobile(true)}
        >
          <span className="text-3xl">☰</span>
        </button>

        <ul className="hidden lg:flex gap-6 text-lg">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/all-issues" className={navLinkClass}>All Issues</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`${dark ? "hover:bg-[#222]" : "hover:bg-gray-100"} btn btn-ghost btn-circle`}
          >
            {dark ? <Sun className="size-5 text-yellow-400" /> : <Moon className="size-5 text-gray-700" />}
          </button>

          {!user && (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
            </div>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle avatar">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 h-10 rounded-full"
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`${dark ? "bg-[#171717] border-[#2A2A2A] text-gray-200" : "bg-white border-gray-200 text-gray-800"} absolute right-0 mt-3 w-64 p-4 rounded-xl shadow-xl border`}
                  >
                    <p className="font-semibold">{user.displayName || "CityFix User"}</p>
                    <p className="text-gray-500 mb-2">{user.email}</p>

                    {!roleLoading && (
                      <span className={`${dbUser?.premium ? "bg-yellow-300 text-black" : "bg-blue-100 text-blue-600"} inline-block mb-3 text-xs px-2 py-1 rounded capitalize`}>
                        {userRoleLabel}
                      </span>
                    )}

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setOpen(false)}
                      className={`${dark ? "hover:bg-[#232323]" : "hover:bg-gray-100"} block px-3 py-2 rounded-md`}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40"
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

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className={`${dark ? "bg-black text-white" : "bg-white text-black"} fixed top-0 right-0 w-64 h-full shadow-xl p-6 z-50`}
          >
            <button
              className="text-3xl mb-6"
              onClick={() => setMobile(false)}
            >
              ✕
            </button>

            <ul className="flex flex-col gap-5 text-lg">
              <NavLink to="/" onClick={() => setMobile(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/all-issues" onClick={() => setMobile(false)} className={navLinkClass}>All Issues</NavLink>
              <NavLink to="/contact" onClick={() => setMobile(false)} className={navLinkClass}>Contact</NavLink>
              <NavLink to="/faq" onClick={() => setMobile(false)} className={navLinkClass}>FAQ</NavLink>
              <NavLink to="/about" onClick={() => setMobile(false)} className={navLinkClass}>About</NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
