import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaThumbsUp } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { Link } from "react-router-dom";

const ExtraOne = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`
          relative overflow-hidden rounded-3xl px-10 py-16 md:px-16 text-center
          border transition-colors duration-300
          ${
            dark
              ? "bg-gradient-to-br from-[#0b0d16] via-[#0f111d] to-[#15182a] text-white border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
              : "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl"
          }
        `}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <span className="inline-block text-sm font-semibold uppercase tracking-wide text-white/80">
            Built for Smart Cities
          </span>

          {/* TITLE */}
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              CityFix
            </span>
            ?
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`
              mt-5 max-w-2xl mx-auto text-lg leading-relaxed
              ${dark ? "text-gray-300" : "text-white/90"}
            `}
          >
            CityFix ensures transparency, faster public-service responses, and
            structured issue tracking — bringing citizens, staff, and
            administrators together on one powerful platform.
          </p>

          {/* BENEFITS */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            {[
              { icon: <FaShieldAlt />, label: "Transparent System" },
              { icon: <FaClock />, label: "Fast Response" },
              { icon: <FaThumbsUp />, label: "Citizen Friendly" },
            ].map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full
                  text-sm font-semibold backdrop-blur
                  border transition
                  ${
                    dark
                      ? "bg-white/10 text-gray-200 border-white/10"
                      : "bg-white/20 text-white border-white/20"
                  }
                `}
              >
                <span className="text-lg">{b.icon}</span>
                {b.label}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-14"
          >
            <Link
              to="/all-issues"
              className={`
                inline-flex items-center gap-2
                px-9 py-3 rounded-xl font-semibold tracking-wide
                transition shadow-lg
                ${
                  dark
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30 hover:opacity-90"
                    : "bg-white text-indigo-700 hover:bg-indigo-50"
                }
              `}
            >
              Explore Features →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraOne;
