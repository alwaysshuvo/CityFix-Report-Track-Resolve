import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Statistics = () => {
  const { dark } = useContext(ThemeContext);

  const stats = [
    {
      icon: <FaClipboardList />,
      label: "Total Issues Reported",
      value: "2,450+",
      iconBg: dark ? "bg-indigo-500/20" : "bg-indigo-100",
      iconText: "text-indigo-500",
      glow: "rgba(99,102,241,0.45)",
    },
    {
      icon: <FaCheckCircle />,
      label: "Issues Resolved",
      value: "1,980+",
      iconBg: dark ? "bg-green-500/20" : "bg-green-100",
      iconText: "text-green-500",
      glow: "rgba(34,197,94,0.45)",
    },
    {
      icon: <FaUsers />,
      label: "Active Citizens",
      value: "3,200+",
      iconBg: dark ? "bg-purple-500/20" : "bg-purple-100",
      iconText: "text-purple-500",
      glow: "rgba(168,85,247,0.45)",
    },
    {
      icon: <FaClock />,
      label: "Avg. Response Time",
      value: "24 Hours",
      iconBg: dark ? "bg-yellow-500/20" : "bg-yellow-100",
      iconText: "text-yellow-500",
      glow: "rgba(234,179,8,0.45)",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-28">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <span
          className={`text-sm font-semibold uppercase tracking-wide ${
            dark ? "text-purple-400" : "text-indigo-600"
          }`}
        >
          Proven Impact
        </span>

        <h2
          className={`mt-2 text-3xl md:text-4xl font-extrabold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          City Impact at a{" "}
          <span
            className={
              dark
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "text-indigo-600"
            }
          >
            Glance
          </span>
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto text-lg ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Real numbers that reflect how CityFix improves response time,
          transparency, and citizen engagement.
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`
              relative rounded-2xl p-7 text-center
              border transition-all duration-300
              ${
                dark
                  ? "bg-[#0f111a] border-white/10 text-gray-200 shadow-[0_0_26px_rgba(168,85,247,0.25)]"
                  : "bg-white border-gray-200 text-gray-700 shadow hover:shadow-2xl"
              }
            `}
          >
            {/* Dark mode glow */}
            {dark && (
              <div
                className="absolute inset-0 -z-10 blur-2xl opacity-40"
                style={{ background: s.glow }}
              />
            )}

            {/* ICON */}
            <div
              className={`
                mx-auto w-14 h-14 rounded-full
                flex items-center justify-center text-2xl mb-4
                ${s.iconBg} ${s.iconText}
              `}
            >
              {s.icon}
            </div>

            {/* VALUE */}
            <h3
              className={`text-2xl font-extrabold ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {s.value}
            </h3>

            {/* LABEL */}
            <p className="mt-1 text-sm opacity-80">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
