import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10" />
            <h2 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                City
              </span>
              <span className="text-white">Fix</span>
            </h2>
          </div>

          <p className="text-sm opacity-80">
            A smart city platform that helps citizens report issues and track resolutions—making cities cleaner, safer, and more responsive.
          </p>

          <div className="flex gap-4 mt-4">
            <FaFacebookF className="text-xl hover:text-blue-400 cursor-pointer transition" />
            <FaYoutube className="text-xl hover:text-red-500 cursor-pointer transition" />
            <FaTwitter className="text-xl hover:text-sky-400 cursor-pointer transition" />
            <FaLinkedinIn className="text-xl hover:text-blue-500 cursor-pointer transition" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/all-issues" className="hover:text-white">All Issues</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white">Privacy Policy</a></li>
            <li><a className="hover:text-white">Terms & Conditions</a></li>
            <li><a className="hover:text-white">User Guide</a></li>
            <li><a className="hover:text-white">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>

          <p className="text-sm opacity-80">Dhaka, Bangladesh</p>
          <p className="text-sm opacity-80">Email: support@cityfix.com</p>

          <Link
            to="/contact"
            className="inline-block mt-5 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} CityFix — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
