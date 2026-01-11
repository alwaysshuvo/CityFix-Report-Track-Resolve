import { motion } from "framer-motion";
import { FiZap, FiMapPin, FiCpu } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const FEATURES = [
  {
    icon: <FiZap />,
    label: "Fast Response",
    light: "text-indigo-600 border-indigo-200",
    dark: "text-indigo-300 border-indigo-500/30",
    glow: "rgba(99,102,241,0.45)",
  },
  {
    icon: <FiMapPin />,
    label: "Live Tracking",
    light: "text-purple-600 border-purple-200",
    dark: "text-purple-300 border-purple-500/30",
    glow: "rgba(168,85,247,0.45)",
  },
  {
    icon: <FiCpu />,
    label: "Smart System",
    light: "text-pink-600 border-pink-200",
    dark: "text-pink-300 border-pink-500/30",
    glow: "rgba(236,72,153,0.45)",
  },
];

const HeroCard = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`
        relative z-10 max-w-4xl mx-auto -mt-28
        px-8 sm:px-12 py-14 rounded-3xl text-center
        border backdrop-blur-xl
        transition-colors duration-300
        ${
          dark
            ? "bg-[#0e101a]/85 border-white/10 text-gray-200 shadow-[0_0_60px_rgba(99,102,241,0.25)]"
            : "bg-white/90 border-gray-200 text-gray-800 shadow-xl"
        }
      `}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl">
        {dark ? (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/60 via-purple-100/40 to-transparent" />
        )}
      </div>

      {/* ICON */}
      <motion.div
        initial={{ rotate: -20, opacity: 0, scale: 0.9 }}
        whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          mx-auto w-16 h-16 rounded-full flex items-center justify-center
          text-3xl mb-6
          ${
            dark
              ? "bg-indigo-900/30 text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.6)]"
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
        transition={{ delay: 0.15 }}
        className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
      >
        Why{" "}
        <span
          className={
            dark
              ? "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              : "text-indigo-600"
          }
        >
          CityFix
        </span>
        ?
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className={`
          max-w-2xl mx-auto text-lg leading-relaxed
          ${dark ? "text-gray-400" : "text-gray-600"}
        `}
      >
        A modern public-service platform to report city issues, track progress in
        real-time, and ensure faster responses from responsible authorities.
      </motion.p>

      {/* FEATURE PILLS */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="flex flex-wrap justify-center gap-5 mt-10"
      >
        {FEATURES.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full
              text-sm font-semibold cursor-default
              border backdrop-blur transition-all
              ${
                dark
                  ? `bg-[#16182a] ${item.dark}`
                  : `bg-white ${item.light}`
              }
            `}
            style={{
              boxShadow: dark ? `0 0 22px ${item.glow}` : undefined,
            }}
          >
            {item.icon}
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default HeroCard;
