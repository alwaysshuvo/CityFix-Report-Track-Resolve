import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-[#0b0f1a] text-gray-300 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-10 h-10" />
            <h2 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                City
              </span>
              <span className="text-white">Fix</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-400">
            A smart city platform helping citizens report public issues and track
            resolutions — making cities cleaner, safer, and more responsive.
          </p>

          {/* Socials */}
          <div className="flex gap-3 pt-3">
            {[FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn].map(
              (Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 text-white transition cursor-pointer"
                >
                  <Icon className="text-sm" />
                </motion.a>
              )
            )}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "All Issues", to: "/all-issues" },
              { name: "FAQ", to: "/faq" },
              { name: "About", to: "/about" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="hover:text-white transition hover:pl-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Privacy Policy",
              "Terms & Conditions",
              "User Guide",
              "Support",
            ].map((item, i) => (
              <li key={i}>
                <span className="hover:text-white transition cursor-pointer hover:pl-1 inline-block">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
          <p className="text-sm text-gray-400 mt-1">
            support@cityfix.com
          </p>

          <Link
            to="/contact"
            className="inline-block mt-6 px-6 py-2 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:opacity-90 transition shadow-md"
          >
            Contact Us →
          </Link>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} CityFix — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
