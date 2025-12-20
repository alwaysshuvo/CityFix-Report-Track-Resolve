import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaThumbsUp } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const ExtraOne = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`
          relative rounded-3xl p-12 text-center shadow-xl overflow-hidden
          ${
            dark
              ? "bg-gradient-to-r from-[#0B0B0B] to-[#171717] text-white"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          }
        `}
      >
        {/* Glow Blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-40 h-40 bg-white rounded-full blur-3xl absolute -top-10 -left-10" />
          <div className="w-56 h-56 bg-purple-300 rounded-full blur-3xl absolute -bottom-10 -right-10" />
        </div>

        {/* Title */}
        <h2 className="relative text-3xl md:text-4xl font-extrabold mb-5 z-10">
          Why Choose CityFix?
        </h2>

        {/* Description */}
        <p
          className={`
            relative max-w-2xl mx-auto text-lg leading-relaxed z-10 opacity-95
            ${dark ? "text-gray-300" : "text-white"}
          `}
        >
          CityFix delivers transparency, fast public-service responses, and structured tracking.  
          Citizens, Staff, and Admin — all benefit from a powerful workflow.
        </p>

        {/* Benefit Pills */}
        <div className="relative flex flex-wrap justify-center gap-6 mt-8 z-10">
          <div
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-md text-sm
              ${
                dark
                  ? "bg-white/10 text-gray-200"
                  : "bg-white/20 text-white"
              }
            `}
          >
            <FaShieldAlt className="text-xl" /> Transparent
          </div>

          <div
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-md text-sm
              ${
                dark
                  ? "bg-white/10 text-gray-200"
                  : "bg-white/20 text-white"
              }
            `}
          >
            <FaClock className="text-xl" /> Fast Response
          </div>

          <div
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur-md text-sm
              ${
                dark
                  ? "bg-white/10 text-gray-200"
                  : "bg-white/20 text-white"
              }
            `}
          >
            <FaThumbsUp className="text-xl" /> Citizen Friendly
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <button
            className={`
              font-semibold px-8 py-3 rounded-xl shadow transition
              ${
                dark
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-white text-indigo-700 hover:bg-gray-100"
              }
            `}
          >
            Explore Features →
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExtraOne;
