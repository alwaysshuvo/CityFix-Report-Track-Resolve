import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { FaEnvelopeOpenText, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
  const { dark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  const handleSubscribe = () => {
    if (!email) {
      setToast({
        type: "error",
        message: "Please enter your email address",
      });
      return;
    }

    setToast({
      type: "success",
      message: "Subscribed successfully 🎉",
    });

    setEmail("");

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-28">
      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg
            ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
          `}
        >
          <FaCheckCircle className="text-lg" />
          <span className="text-sm font-medium">{toast.message}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`
          relative overflow-hidden rounded-3xl
          px-10 py-16 md:px-16 text-center
          border transition-colors duration-300
          ${
            dark
              ? "bg-gradient-to-br from-[#0f111a] via-[#1a1033] to-[#2a0f45] text-white border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.35)]"
              : "bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white shadow-2xl"
          }
        `}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-400 rounded-full blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {/* ICON */}
          <div
            className={`
              mx-auto w-16 h-16 rounded-full
              flex items-center justify-center mb-6
              ${
                dark
                  ? "bg-white/10 text-purple-300"
                  : "bg-white/20 text-white"
              }
            `}
          >
            <FaEnvelopeOpenText className="text-2xl" />
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Stay Updated with CityFix
          </h2>

          {/* DESCRIPTION */}
          <p className="max-w-xl mx-auto text-base md:text-lg opacity-90 mb-10">
            Get updates about city improvements, resolved issues, and new
            platform features — straight to your inbox.
          </p>

          {/* FORM */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`
                px-5 py-3 rounded-xl outline-none w-full sm:w-80 transition
                ${
                  dark
                    ? "bg-[#1a1a2e] text-white placeholder-gray-400 border border-purple-500/30 focus:border-purple-500"
                    : "bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400"
                }
              `}
            />

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              className={`
                px-9 py-3 rounded-xl font-semibold
                transition shadow-lg
                ${
                  dark
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30 hover:opacity-90"
                    : "bg-white text-indigo-700 hover:bg-indigo-50"
                }
              `}
            >
              Subscribe →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
