import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers, FaBolt, FaMapMarkerAlt } from "react-icons/fa";

const Features = () => {
  const items = [
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-3xl" />,
      title: "Smart Issue Reporting",
      desc: "Report problems with photos, location and details instantly.",
    },
    {
      icon: <FaBolt className="text-yellow-500 text-3xl" />,
      title: "Fast Response Workflow",
      desc: "Admins assign staff and track status with real-time updates.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-3xl" />,
      title: "Role-Based Dashboard",
      desc: "Dedicated dashboards for Citizen, Staff and Admin.",
    },
    {
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      title: "Transparent Resolution",
      desc: "Track lifecycle from Reported → Resolved with timeline.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      {/* Section animation */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-12"
      >
        Key Features of CityFix
      </motion.h2>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition cursor-pointer text-center"
          >
            {/* Icon circle */}
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {f.icon}
            </div>

            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              {f.title}
            </h3>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
