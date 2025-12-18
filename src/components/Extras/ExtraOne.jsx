import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaThumbsUp } from "react-icons/fa";

const ExtraOne = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white rounded-3xl p-12 text-center shadow-xl relative overflow-hidden
        "
      >
        {/* Glow Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-40 h-40 bg-white rounded-full blur-3xl absolute -top-10 -left-10" />
          <div className="w-56 h-56 bg-purple-300 rounded-full blur-3xl absolute -bottom-10 -right-10" />
        </div>

        {/* Content */}
        <h2 className="relative text-3xl md:text-4xl font-extrabold mb-5 z-10">
          Why Choose CityFix?
        </h2>

        <p className="relative max-w-2xl mx-auto text-lg opacity-95 leading-relaxed z-10">
          CityFix delivers transparency, fast public-service responses, and structured tracking.  
          Citizens, Staff, and Admin — all benefit from a powerful workflow.
        </p>

        {/* Icon Benefits */}
        <div className="relative flex flex-wrap justify-center gap-6 mt-8 z-10">
          <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl backdrop-blur-md text-sm">
            <FaShieldAlt className="text-white text-xl" /> Transparent
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl backdrop-blur-md text-sm">
            <FaClock className="text-white text-xl" /> Fast Response
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl backdrop-blur-md text-sm">
            <FaThumbsUp className="text-white text-xl" /> Citizen Friendly
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
          <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition">
            Explore Features →
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExtraOne;
