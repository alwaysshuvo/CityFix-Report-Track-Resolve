import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const ExtraTwo = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`
          relative rounded-3xl p-12 text-center shadow-xl border overflow-hidden
          ${
            dark
              ? "bg-gradient-to-br from-[#0B0B0B] to-[#151515] border-purple-500/20"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* Glow Gradient Border Layer */}
        <div
          className={`
            absolute inset-0 rounded-3xl bg-gradient-to-r opacity-25 pointer-events-none
            ${
              dark
                ? "from-purple-500/40 to-pink-500/40"
                : "from-blue-400 to-indigo-400"
            }
          `}
        ></div>

        {/* Title */}
        <h2
          className={`
            relative text-3xl md:text-4xl font-extrabold mb-4 z-10
            ${dark ? "text-white" : "text-gray-800"}
          `}
        >
          Ready to Improve Your City?
        </h2>

        {/* Description */}
        <p
          className={`
            relative max-w-xl mx-auto leading-relaxed z-10
            ${dark ? "text-gray-400" : "text-gray-600"}
          `}
        >
          Join thousands of citizens making the city better — report public
          issues in one click and track progress transparently.
        </p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 relative z-10 mv-20"
        >
          <Link
            to="/dashboard/report-issue"
            className={`
              inline-block px-10 py-3 rounded-xl text-lg font-semibold shadow-md transition
              ${
                dark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }
            `}
          >
            Report an Issue →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExtraTwo;
