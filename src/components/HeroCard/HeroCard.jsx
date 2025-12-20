import { motion } from "framer-motion";
import { FiZap, FiMapPin, FiCpu } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const HeroCard = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.03 }}
      className={`
        max-w-4xl mx-auto p-8 rounded-2xl transition-all duration-300 text-center border
        ${dark
          ? "bg-[#111] text-gray-200 border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          : "bg-gradient-to-br from-white to-indigo-50 text-gray-800 shadow-md"
        }
      `}
    >

      {/* ICON */}
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`
          mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5
          ${dark
            ? "bg-purple-900/30 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            : "bg-indigo-100 text-indigo-600"
          }
        `}
      >
        <FiZap />
      </motion.div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`
          text-3xl font-extrabold mb-3
          ${dark ? "text-white" : "text-gray-800"}
        `}
      >
        Why CityFix?
      </motion.h2>

      {/* SUBTEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className={`
          max-w-2xl mx-auto leading-relaxed text-lg
          ${dark ? "text-gray-400" : "text-gray-600"}
        `}
      >
        A modern public-service platform where you can report issues,
        track updates, and get faster responses from authorities.
      </motion.p>

      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mt-6"
      >
        {/* Feature Pills */}
        {[ 
          { icon: <FiZap />, label: "Fast Response", color: "indigo" },
          { icon: <FiMapPin />, label: "Live Tracking", color: "purple" },
          { icon: <FiCpu />, label: "Smart System", color: "pink" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.08 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl font-medium cursor-pointer border transition
              ${dark
                ? `bg-[#1A1A1A] text-${item.color}-300 border-${item.color}-500/30 shadow-[0_0_12px_rgba(168,85,247,0.25)]`
                : `bg-white text-${item.color}-600 border`
              }
            `}
          >
            {item.icon} {item.label}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroCard;
