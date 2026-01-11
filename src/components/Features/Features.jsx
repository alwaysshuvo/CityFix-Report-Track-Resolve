import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUsers,
  FaBolt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Features = () => {
  const { dark } = useContext(ThemeContext);

  const items = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Smart Issue Reporting",
      desc: "Report problems instantly with photos, location, and detailed information.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <FaBolt />,
      title: "Fast Response Workflow",
      desc: "Admins assign staff and track progress with real-time status updates.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <FaUsers />,
      title: "Role-Based Dashboard",
      desc: "Dedicated dashboards for Citizens, Staff, and Administrators.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaCheckCircle />,
      title: "Transparent Resolution",
      desc: "Track the entire lifecycle from Reported to Resolved with a clear timeline.",
      color: "from-green-500 to-emerald-600",
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
          What You Get
        </span>

        <h2
          className={`mt-2 text-3xl md:text-4xl font-extrabold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Key Features of{" "}
          <span
            className={
              dark
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "text-indigo-600"
            }
          >
            CityFix
          </span>
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto text-lg ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Everything you need to report, track, and resolve public infrastructure
          issues — built for transparency and speed.
        </p>
      </motion.div>

      {/* FEATURE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -12 }}
            className={`
              group relative rounded-2xl p-7 text-center
              border transition-all duration-300
              ${
                dark
                  ? "bg-[#0f111a] border-white/10 text-gray-200 shadow-[0_0_22px_rgba(168,85,247,0.22)]"
                  : "bg-white border-gray-200 text-gray-700 shadow hover:shadow-2xl"
              }
            `}
          >
            {/* ICON */}
            <div
              className={`
                mx-auto w-16 h-16 rounded-xl flex items-center justify-center
                text-3xl text-white mb-6
                bg-gradient-to-br ${f.color}
                transition-transform duration-300
                group-hover:scale-110
                ${
                  dark
                    ? "shadow-[0_0_22px_rgba(168,85,247,0.35)]"
                    : "shadow-md"
                }
              `}
            >
              {f.icon}
            </div>

            {/* TITLE */}
            <h3
              className={`text-xl font-semibold ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {f.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className={`mt-3 text-sm leading-relaxed ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {f.desc}
            </p>

            {/* BOTTOM ACCENT LINE */}
            <span
              className={`absolute inset-x-8 bottom-5 h-[2px] rounded-full
                bg-gradient-to-r ${f.color} opacity-60`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
