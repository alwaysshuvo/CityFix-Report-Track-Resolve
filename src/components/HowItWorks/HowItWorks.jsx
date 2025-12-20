import { motion } from "framer-motion";
import { FaCamera, FaUserCheck, FaTruck, FaCheck } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const HowItWorks = () => {
  const { dark } = useContext(ThemeContext);

  const steps = [
    {
      icon: (
        <FaCamera
          className={`text-3xl ${dark ? "text-purple-300" : "text-blue-600"}`}
        />
      ),
      title: "Report an Issue",
      desc: "Submit photos, location and details instantly.",
    },
    {
      icon: (
        <FaUserCheck
          className={`text-3xl ${dark ? "text-pink-300" : "text-purple-600"}`}
        />
      ),
      title: "Admin Review",
      desc: "Admin verifies and assigns work to the right staff.",
    },
    {
      icon: (
        <FaTruck
          className={`text-3xl ${dark ? "text-yellow-300" : "text-yellow-500"}`}
        />
      ),
      title: "Staff Action",
      desc: "Staff investigates and updates timeline progress.",
    },
    {
      icon: (
        <FaCheck
          className={`text-3xl ${dark ? "text-green-300" : "text-green-600"}`}
        />
      ),
      title: "Issue Resolved",
      desc: "Live notifications keep the citizen updated.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24 transition-all duration-300">
      
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-3xl md:text-4xl font-extrabold text-center mb-14 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        How CityFix Works
      </motion.h2>

      {/* Step Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`
              rounded-2xl cursor-pointer p-6 text-center transition relative border shadow
              ${
                dark
                  ? "bg-[#111] border-purple-500/20 text-gray-200 hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]"
                  : "bg-white border-gray-200 text-gray-700 hover:shadow-xl"
              }
            `}
          >
            {/* Step Number Badge */}
            <div
              className={`
                absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                ${
                  dark
                    ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-indigo-600 text-white"
                }
              `}
            >
              {i + 1}
            </div>

            {/* Icon */}
            <div
              className={`
                mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition
                ${dark ? "bg-[#1B1B1B]" : "bg-gray-100"}
              `}
            >
              {s.icon}
            </div>

            {/* Title */}
            <h3
              className={`text-xl font-semibold ${
                dark ? "text-white" : "text-gray-800"
              }`}
            >
              {s.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm leading-relaxed ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
