import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers, FaBolt, FaMapMarkerAlt } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Features = () => {
  const { dark } = useContext(ThemeContext);

  const items = [
    {
      icon: (
        <FaMapMarkerAlt
          className={`text-3xl ${dark ? "text-purple-300" : "text-blue-600"}`}
        />
      ),
      title: "Smart Issue Reporting",
      desc: "Report problems with photos, location and details instantly.",
    },
    {
      icon: (
        <FaBolt
          className={`text-3xl ${dark ? "text-yellow-300" : "text-yellow-500"}`}
        />
      ),
      title: "Fast Response Workflow",
      desc: "Admins assign staff and track status with real-time updates.",
    },
    {
      icon: (
        <FaUsers
          className={`text-3xl ${dark ? "text-pink-300" : "text-purple-600"}`}
        />
      ),
      title: "Role-Based Dashboard",
      desc: "Dedicated dashboards for Citizen, Staff and Admin.",
    },
    {
      icon: (
        <FaCheckCircle
          className={`text-3xl ${dark ? "text-green-300" : "text-green-600"}`}
        />
      ),
      title: "Transparent Resolution",
      desc: "Track lifecycle from Reported → Resolved with timeline.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 transition-all duration-300">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`text-3xl md:text-4xl font-extrabold text-center mb-12 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        Key Features of CityFix
      </motion.h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{ scale: 1.06, y: -6 }}
            className={`
              rounded-2xl p-6 border transition cursor-pointer text-center shadow-sm
              ${
                dark
                  ? "bg-[#111] border-purple-500/20 text-gray-200 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  : "bg-white border-gray-200 text-gray-700 hover:shadow-xl"
              }
            `}
          >
            {/* Circle Icon */}
            <div
              className={`
                mx-auto w-16 h-16 rounded-full flex items-center justify-center transition
                ${dark ? "bg-[#1E1E1E]" : "bg-gray-100"}
              `}
            >
              {f.icon}
            </div>

            {/* Title */}
            <h3
              className={`text-xl font-semibold mt-4 ${
                dark ? "text-white" : "text-gray-800"
              }`}
            >
              {f.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm leading-relaxed ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
