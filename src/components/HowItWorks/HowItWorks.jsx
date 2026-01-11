import { motion } from "framer-motion";
import { FaCamera, FaUserCheck, FaTruck, FaCheck } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const HowItWorks = () => {
  const { dark } = useContext(ThemeContext);

  const steps = [
    {
      icon: <FaCamera />,
      title: "Report an Issue",
      desc: "Submit photos, location, and details in seconds using a simple form.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <FaUserCheck />,
      title: "Admin Review",
      desc: "Admins verify reports and assign the task to the right staff.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaTruck />,
      title: "Staff Action",
      desc: "Assigned staff investigates and updates progress in real-time.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <FaCheck />,
      title: "Issue Resolved",
      desc: "Once resolved, citizens are notified with a complete timeline.",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-32">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <span
          className={`text-sm font-semibold uppercase tracking-wide ${
            dark ? "text-purple-400" : "text-indigo-600"
          }`}
        >
          Simple Process
        </span>

        <h2
          className={`mt-2 text-3xl md:text-4xl font-extrabold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          How{" "}
          <span
            className={
              dark
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "text-indigo-600"
            }
          >
            CityFix
          </span>{" "}
          Works
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto text-lg ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          From reporting an issue to final resolution — a clear, transparent
          workflow designed for speed and accountability.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((s, i) => (
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
            {/* STEP NUMBER */}
            <div
              className={`
                absolute -top-4 left-1/2 -translate-x-1/2
                w-9 h-9 rounded-full flex items-center justify-center
                text-xs font-bold text-white
                bg-gradient-to-br ${s.color}
                ${dark ? "shadow-[0_0_14px_rgba(168,85,247,0.45)]" : "shadow-md"}
              `}
            >
              {i + 1}
            </div>

            {/* ICON */}
            <div
              className={`
                mx-auto mt-8 mb-6 w-16 h-16 rounded-xl
                flex items-center justify-center
                text-3xl text-white
                bg-gradient-to-br ${s.color}
                transition-transform duration-300
                group-hover:scale-110
                ${dark ? "shadow-[0_0_22px_rgba(168,85,247,0.35)]" : "shadow-md"}
              `}
            >
              {s.icon}
            </div>

            {/* TITLE */}
            <h3
              className={`text-xl font-semibold ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              {s.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className={`mt-3 text-sm leading-relaxed ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {s.desc}
            </p>

            {/* CONNECTOR (desktop only) */}
            {i !== steps.length - 1 && (
              <span
                className={`
                  hidden lg:block absolute top-1/2 -right-5
                  w-10 h-[2px] opacity-60
                  bg-gradient-to-r ${s.color}
                `}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
