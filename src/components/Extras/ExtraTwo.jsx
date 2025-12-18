import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ExtraTwo = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          bg-white rounded-3xl p-12 text-center shadow-xl border 
          relative overflow-hidden
        "
      >
        {/* Gradient glow border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20"></div>

        <h2 className="relative text-3xl md:text-4xl font-extrabold mb-4 text-gray-800 z-10">
          Ready to Improve Your City?
        </h2>

        <p className="relative text-gray-600 max-w-xl mx-auto leading-relaxed z-10">
          Join thousands of citizens making the city better — report public issues
          in one click and track progress transparently.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 z-10 relative"
        >
          <Link
            to="/dashboard/report-issue"
            className="
              inline-block px-10 py-3 rounded-xl 
              bg-indigo-600 text-white text-lg font-semibold
              hover:bg-indigo-700 shadow-md transition
            "
          >
            Report an Issue →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExtraTwo;
