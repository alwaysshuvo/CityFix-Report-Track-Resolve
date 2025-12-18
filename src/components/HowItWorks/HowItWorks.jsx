import { motion } from "framer-motion";
import { FaCamera, FaUserCheck, FaTruck, FaCheck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaCamera className="text-blue-600 text-3xl" />,
      title: "Report an Issue",
      desc: "Submit photos, location and details instantly.",
    },
    {
      icon: <FaUserCheck className="text-purple-600 text-3xl" />,
      title: "Admin Review",
      desc: "Admin verifies and assigns work to the right staff.",
    },
    {
      icon: <FaTruck className="text-yellow-500 text-3xl" />,
      title: "Staff Action",
      desc: "Staff investigates and updates timeline progress.",
    },
    {
      icon: <FaCheck className="text-green-600 text-3xl" />,
      title: "Issue Resolved",
      desc: "Live notifications keep the citizen updated.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24">
      {/* Section Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-14"
      >
        How CityFix Works
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white border rounded-2xl shadow hover:shadow-xl cursor-pointer p-6 text-center transition relative"
          >
            {/* Step Number Circle */}
            <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold w-7 h-7 rounded-full flex items-center justify-center">
              {i + 1}
            </div>

            {/* Icon circle */}
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {s.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-800">{s.title}</h3>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
