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
    <section className="max-w-7xl mx-auto px-4 mt-24 relative">
      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`
          relative rounded-3xl p-10 md:p-14 text-center overflow-hidden
          ${
            dark
              ? "bg-gradient-to-br from-[#0f0f1a] via-[#1a1033] to-[#2a0f45] text-white shadow-[0_0_35px_rgba(168,85,247,0.35)]"
              : "bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white shadow-xl"
          }
        `}
      >
        {/* Glow */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="w-56 h-56 bg-purple-400 rounded-full blur-3xl absolute -top-20 -left-20" />
          <div className="w-72 h-72 bg-indigo-400 rounded-full blur-3xl absolute -bottom-24 -right-24" />
        </div>

        {/* Icon */}
        <div
          className={`relative mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
            dark
              ? "bg-white/10 text-purple-300"
              : "bg-white/20 text-white"
          }`}
        >
          <FaEnvelopeOpenText className="text-2xl" />
        </div>

        {/* Title */}
        <h2 className="relative text-3xl md:text-4xl font-extrabold mb-4">
          Stay Updated with CityFix
        </h2>

        {/* Description */}
        <p className="relative max-w-xl mx-auto opacity-90 mb-8 text-sm md:text-base">
          Get updates about city improvements, resolved issues, and new platform
          features — straight to your inbox.
        </p>

        {/* FORM */}
        <div className="relative flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`
              px-5 py-3 rounded-xl outline-none w-full sm:w-72 transition
              ${
                dark
                  ? "bg-[#1a1a2e] text-white placeholder-gray-400 border border-purple-500/30 focus:border-purple-500"
                  : "bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400"
              }
            `}
          />

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubscribe}
            className={`
              px-8 py-3 rounded-xl font-semibold shadow transition
              ${
                dark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-white text-indigo-700 hover:bg-gray-100"
              }
            `}
          >
            Subscribe →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
