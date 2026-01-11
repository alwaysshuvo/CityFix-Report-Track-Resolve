import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const ExtraTwo = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative rounded-3xl p-12 md:p-16 text-center overflow-hidden border ${
          dark
            ? "bg-[#0B0B0B] border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        {/* Soft Gradient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 ${
              dark ? "bg-purple-500" : "bg-indigo-400"
            }`}
          />
          <div
            className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30 ${
              dark ? "bg-indigo-500" : "bg-purple-400"
            }`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {/* TITLE */}
          <h2
            className={`text-3xl md:text-4xl font-extrabold mb-4 ${
              dark ? "text-white" : "text-gray-800"
            }`}
          >
            Ready to Improve Your{" "}
            <span className={dark ? "text-purple-400" : "text-indigo-600"}>
              City
            </span>
            ?
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`max-w-xl mx-auto text-lg leading-relaxed ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join thousands of responsible citizens working together to make
            public services faster, transparent, and more efficient.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <Link
              to="/dashboard/report-issue"
              className={`inline-flex items-center gap-2 px-10 py-3 rounded-xl text-lg font-semibold transition-all shadow-lg ${
                dark
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Report an Issue →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraTwo;
