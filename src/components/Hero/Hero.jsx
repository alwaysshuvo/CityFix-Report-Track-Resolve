import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center 
    bg-gradient-to-br from-blue-100 via-white to-purple-100 pt-28 px-5">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Report Public Issues <br />
            <span className="text-indigo-600">Track Progress in Real-Time</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-lg">
            Raise complaints about streetlights, water leakage, damaged roads, garbage overflow — 
            and let the authority fix them fast.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/report-issue"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Report an Issue
            </Link>

            <Link
              to="/all-issues"
              className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
            >
              View All Issues
            </Link>
          </div>

          {/* TRUST BADGES */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <div className="bg-white p-3 rounded-xl shadow text-sm font-medium text-gray-700">
              ⚡ Fast Response
            </div>
            <div className="bg-white p-3 rounded-xl shadow text-sm font-medium text-gray-700">
              🔒 Secure Reports
            </div>
            <div className="bg-white p-3 rounded-xl shadow text-sm font-medium text-gray-700">
              📍 Live Tracking
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/Xr4xZxtD/Gemini-Generated-Image-muaiqhmuaiqhmuai.png"
            alt="Hero Illustration"
            className="max-w-md drop-shadow-lg rounded-xl w-[600px] h-[400px] object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
