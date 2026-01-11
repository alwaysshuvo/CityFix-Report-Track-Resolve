import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const { dark } = useContext(ThemeContext);

  const data = [
    {
      name: "Rahim Ahmed",
      role: "Citizen",
      text: "I reported a broken streetlight and it was fixed within two days. CityFix really works!",
      glow: "rgba(99,102,241,0.45)",
    },
    {
      name: "Nusrat Jahan",
      role: "Resident",
      text: "The tracking system is amazing. I could see every update until my issue was resolved.",
      glow: "rgba(168,85,247,0.45)",
    },
    {
      name: "Imran Hossain",
      role: "Community Member",
      text: "Finally a transparent system where citizens and authorities work together.",
      glow: "rgba(34,197,94,0.45)",
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
          Social Proof
        </span>

        <h2
          className={`mt-2 text-3xl md:text-4xl font-extrabold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          What{" "}
          <span
            className={
              dark
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "text-indigo-600"
            }
          >
            Citizens
          </span>{" "}
          Say
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto text-lg ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Real feedback from people using CityFix to improve their communities.
        </p>
      </motion.div>

      {/* TESTIMONIAL GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {data.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`
              group relative rounded-2xl p-7
              border transition-all duration-300
              ${
                dark
                  ? "bg-[#0f111a] border-white/10 text-gray-200 shadow-[0_0_26px_rgba(168,85,247,0.25)]"
                  : "bg-white border-gray-200 text-gray-700 shadow hover:shadow-2xl"
              }
            `}
          >
            {/* Dark Glow */}
            {dark && (
              <div
                className="absolute inset-0 -z-10 blur-2xl opacity-40"
                style={{ background: t.glow }}
              />
            )}

            {/* QUOTE ICON */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-4
                ${
                  dark
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-indigo-100 text-indigo-600"
                }
              `}
            >
              <FaQuoteLeft />
            </div>

            {/* TEXT */}
            <p className="text-sm leading-relaxed opacity-90">
              “{t.text}”
            </p>

            {/* AUTHOR */}
            <div className="mt-6">
              <h4
                className={`font-semibold ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                {t.name}
              </h4>
              <p className="text-xs opacity-70">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
