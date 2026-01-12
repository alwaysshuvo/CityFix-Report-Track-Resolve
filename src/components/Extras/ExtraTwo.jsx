import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const ExtraTwo = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-32 pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`
          relative overflow-hidden rounded-3xl
          px-10 py-16 md:px-20 text-center
          border transition-colors duration-300
          ${
            dark
              ? "bg-gradient-to-br from-[#0b0d16] via-[#0f111d] to-[#15182a] text-white border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
              : "bg-white text-gray-900 border-gray-200 shadow-2xl"
          }
        `}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-30 ${
              dark ? "bg-purple-500" : "bg-indigo-400"
            }`}
          />
          <div
            className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 ${
              dark ? "bg-indigo-500" : "bg-purple-400"
            }`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wide ${
              dark ? "text-purple-400" : "text-indigo-600"
            }`}
          >
            Take Action
          </span>

          {/* TITLE */}
          <h2
            className={`mt-3 text-3xl md:text-4xl font-extrabold tracking-tight ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to Improve Your{" "}
            <span
              className={
                dark
                  ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                  : "text-indigo-600"
              }
            >
              City
            </span>
            ?
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`mt-5 max-w-xl mx-auto text-lg leading-relaxed ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join thousands of responsible citizens working together to make
            public services faster, transparent, and more efficient.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Link
              to="/dashboard/report-issue"
              className={`
                inline-flex items-center gap-2
                px-10 py-3 rounded-xl text-lg font-semibold
                transition shadow-lg
                ${
                  dark
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30 hover:opacity-90"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }
              `}
            >
              Report an Issue →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraTwo;
