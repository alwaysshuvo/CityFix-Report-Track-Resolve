import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const Hero = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <section
      className={`
        relative flex items-center overflow-hidden
        min-h-[100vh] pt-32 pb-24 px-5
        transition-colors duration-300
        ${dark ? "bg-[#07090f] text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* ===== Ambient Gradient Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-purple-500/20 rounded-full blur-[140px]" />
        {!dark && (
          <div className="absolute bottom-0 left-1/3 w-[480px] h-[480px] bg-blue-300/20 rounded-full blur-[160px]" />
        )}
      </div>

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
            className={`
              inline-block text-sm font-semibold tracking-wide uppercase
              ${dark ? "text-indigo-400" : "text-indigo-600"}
            `}
          >
            Smart City Platform
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
            Report Public Issues <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Track Progress in Real-Time
            </span>
          </h1>

          {/* Description */}
          <p
            className={`
              max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed
              ${dark ? "text-gray-300" : "text-gray-600"}
            `}
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

          {/* Trust / Feature Pills */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
            {["⚡ Fast Response", "🔒 Secure Reports", "📍 Live Tracking"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium backdrop-blur
                    ${
                      dark
                        ? "bg-white/10 text-gray-200"
                        : "bg-white text-gray-700 shadow-sm"
                    }
                  `}
                >
                  {item}
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* ================= RIGHT VISUAL ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* Image Glow */}
          <div
            className={`
              absolute inset-0 rounded-3xl blur-2xl
              ${dark ? "bg-indigo-500/20" : "bg-indigo-300/30"}
            `}
          />

          <img
            src="https://i.ibb.co.com/Xr4xZxtD/Gemini-Generated-Image-muaiqhmuaiqhmuai.png"
            alt="City illustration"
            className={`
              relative w-[520px] max-w-full rounded-3xl
              ${
                dark
                  ? "shadow-[0_0_60px_rgba(99,102,241,0.45)]"
                  : "shadow-2xl"
              }
            `}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
