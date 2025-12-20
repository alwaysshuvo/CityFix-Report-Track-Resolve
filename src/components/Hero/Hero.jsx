import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Hero = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section
      className={`
        min-h-[90vh] flex items-center pt-28 px-5 transition-all duration-300
        ${
          dark
            ? "bg-[#0B0B0B] text-white"
            : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-black"
        }
      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1
            className={`
              text-4xl lg:text-5xl font-extrabold leading-tight
              ${dark ? "text-white" : "text-gray-800"}
            `}
          >
            Report Public Issues <br />
            <span
              className={dark ? "text-purple-300" : "text-indigo-600"}
            >
              Track Progress in Real-Time
            </span>
          </h1>

          <p
            className={`
              text-lg max-w-lg
              ${dark ? "text-gray-400" : "text-gray-600"}
            `}
          >
            Raise complaints about streetlights, water leakage, damaged roads, 
            garbage overflow — and let the authority fix them fast.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              className={`
                px-6 py-3 rounded-xl font-semibold transition
                ${dark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"}
              `}
            >
              Report an Issue
            </Link>

            <Link
              className={`
                px-6 py-3 rounded-xl font-semibold border transition
                ${
                  dark
                    ? "border-purple-500 text-purple-300 hover:bg-[#222]"
                    : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                }
              `}
            >
              View All Issues
            </Link>
          </div>

          {/* BADGES */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            {[
              "⚡ Fast Response",
              "🔒 Secure Reports",
              "📍 Live Tracking",
            ].map((item, i) => (
              <div
                key={i}
                className={`
                  p-3 rounded-xl shadow text-sm font-medium transition
                  ${
                    dark
                      ? "bg-[#1A1A1A] text-gray-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]"
                      : "bg-white text-gray-700"
                  }
                `}
              >
                {item}
              </div>
            ))}
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
            className={`
              max-w-md rounded-xl w-[600px] h-[400px] object-cover transition
              ${
                dark
                  ? "drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                  : "drop-shadow-lg"
              }
            `}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
