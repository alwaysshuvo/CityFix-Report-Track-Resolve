import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Hero = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section
      className={`
        relative flex items-center
        min-h-[100vh]
        pt-32 pb-32 px-5
        mb-32
        transition-colors duration-300
        ${dark ? "bg-black text-white" : "bg-white text-gray-900"}
      `}
    >
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Eyebrow */}
          <span
            className={`inline-block text-sm font-semibold tracking-wide uppercase ${
              dark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Smart City Platform
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
            Report Public Issues <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Track Progress in Real-Time
            </span>
          </h1>

          {/* Description */}
          <p
            className={`max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Report streetlights, water leaks, damaged roads or garbage overflow —
            and transparently track how authorities resolve them.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              to="/dashboard/report-issue"
              className="
                inline-flex items-center justify-center gap-2
                px-8 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:opacity-90 transition
                shadow-lg shadow-indigo-500/30
              "
            >
              🚨 Report an Issue
            </Link>

            <Link
              to="/all-issues"
              className={`
                inline-flex items-center justify-center
                px-8 py-3 rounded-xl font-semibold
                border transition
                ${
                  dark
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                }
              `}
            >
              View All Issues
            </Link>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
            {["⚡ Fast Response", "🔒 Secure Reports", "📍 Live Tracking"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    dark
                      ? "bg-white/10 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item}
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/Xr4xZxtD/Gemini-Generated-Image-muaiqhmuaiqhmuai.png"
            alt="City illustration"
            className={`w-[520px] max-w-full rounded-3xl ${
              dark
                ? "shadow-[0_0_40px_rgba(99,102,241,0.35)]"
                : "shadow-xl"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
