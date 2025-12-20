import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="
    min-h-[90vh] flex items-center pt-28 px-5
    bg-gradient-to-br from-blue-100 via-white to-purple-100
    dark:bg-gradient-to-br dark:from-[#0A0A0A] dark:via-[#101010] dark:to-[#1A1A1A]
    transition-all duration-300
  "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 dark:text-white">
            Report Public Issues <br />
            <span className="text-indigo-600 dark:text-purple-300">
              Track Progress in Real-Time
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg">
            Raise complaints about streetlights, water leakage, damaged roads,
            garbage overflow — and let the authority fix them fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 dark:bg-purple-600 dark:hover:bg-purple-700">
              Report an Issue
            </Link>

            <Link className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-[#222]">
              View All Issues
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <div className="bg-white dark:bg-[#222] p-3 rounded-xl shadow text-sm font-medium text-gray-700 dark:text-gray-300">
              ⚡ Fast Response
            </div>
            <div className="bg-white dark:bg-[#222] p-3 rounded-xl shadow text-sm font-medium text-gray-700 dark:text-gray-300">
              🔒 Secure Reports
            </div>
            <div className="bg-white dark:bg-[#222] p-3 rounded-xl shadow text-sm font-medium text-gray-700 dark:text-gray-300">
              📍 Live Tracking
            </div>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/Xr4xZxtD/Gemini-Generated-Image-muaiqhmuaiqhmuai.png"
            className="max-w-md rounded-xl w-[600px] h-[400px] object-cover drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
