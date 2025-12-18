import { motion } from "framer-motion";
import { FiZap, FiMapPin, FiCpu } from "react-icons/fi";

const HeroCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.03 }}
      className="
        max-w-4xl mx-auto p-8 rounded-2xl 
        bg-gradient-to-br from-white to-indigo-50
        shadow-md hover:shadow-xl border transition-all duration-300
        text-center
      "
    >
      {/* ICON */}
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-16 h-16 bg-indigo-100 text-indigo-600 
          rounded-full flex items-center justify-center text-3xl mb-5"
      >
        <FiZap />
      </motion.div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold text-gray-800 mb-3"
      >
        Why CityFix?
      </motion.h2>

      {/* SUBTEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
      >
        A modern public-service platform where you can report issues, 
        track updates, and get faster response from authorities.
      </motion.p>

      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mt-6"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow 
            border text-indigo-600 font-medium cursor-pointer"
        >
          <FiZap /> Fast Response
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow 
            border text-purple-600 font-medium cursor-pointer"
        >
          <FiMapPin /> Live Tracking
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow 
            border text-pink-600 font-medium cursor-pointer"
        >
          <FiCpu /> Smart System
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroCard;
