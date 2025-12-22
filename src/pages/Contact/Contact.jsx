import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import Swal from "sweetalert2"; // <== added import!

const Contact = () => {
  const { dark } = useContext(ThemeContext);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!name || !email || !message) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields before sending.",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thanks for contacting CityFix. We'll reply soon.",
      confirmButtonColor: "#6366f1",
    });

    form.reset();
  };

  return (
    <section
      className={`
        pt-32 pb-24 transition-all duration-300
        ${
          dark
            ? "bg-[#0A0A0A] text-gray-200"
            : "bg-gradient-to-b from-slate-100 to-white text-slate-900"
        }
      `}
    >
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1
          className={`
            text-4xl md:text-5xl font-extrabold
            ${dark ? "text-white" : "text-slate-900"}
          `}
        >
          Contact{" "}
          <span className={dark ? "text-purple-400" : "text-blue-600"}>
            CityFix
          </span>
        </h1>
        <p
          className={`
            mt-3 text-lg max-w-2xl mx-auto
            ${dark ? "text-gray-400" : "text-slate-600"}
          `}
        >
          Have questions or want support? Drop your message — we reply fast!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        
        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`
            rounded-2xl p-10 border shadow-xl
            transition-all duration-300
            ${
              dark
                ? "bg-[#111] border-gray-800 shadow-purple-900/40"
                : "bg-white border-slate-200"
            }
          `}
        >
          <h2
            className={`
              text-2xl font-bold mb-6
              ${dark ? "text-white" : "text-slate-800"}
            `}
          >
            Send Us a Message
          </h2>

          {/* FORM START */}
          <form className="space-y-6" onSubmit={handleMessageSubmit}>
            <div>
              <label className={`font-semibold ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className={`
                  input input-bordered w-full mt-2 transition
                  ${
                    dark
                      ? "bg-[#1A1A1A] border-gray-700 text-white placeholder-gray-500"
                      : "bg-slate-50 border-slate-300 text-black"
                  }
                `}
              />
            </div>

            <div>
              <label className={`font-semibold ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className={`
                  input input-bordered w-full mt-2 transition
                  ${
                    dark
                      ? "bg-[#1A1A1A] border-gray-700 text-white placeholder-gray-500"
                      : "bg-slate-50 border-slate-300 text-black"
                  }
                `}
              />
            </div>

            <div>
              <label className={`font-semibold ${dark ? "text-gray-300" : "text-slate-700"}`}>
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Type your message…"
                className={`
                  textarea textarea-bordered w-full mt-2 transition
                  ${
                    dark
                      ? "bg-[#1A1A1A] border-gray-700 text-white placeholder-gray-500"
                      : "bg-slate-50 border-slate-300 text-black"
                  }
                `}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-full py-3 font-semibold rounded-xl transition
                ${
                  dark
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
              `}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`
            relative rounded-2xl overflow-hidden border shadow-lg transition
            ${dark ? "bg-[#111] border-gray-800" : "bg-white border"}
          `}
        >
          {/* Background Illustration */}
          <img
            src="https://i.ibb.co.com/HpNVFKcS/caohdf.jpg"
            alt="Contact Illustration"
            className="object-cover w-full h-72 md:h-full opacity-90"
          />

          {/* Transparent Info Overlay */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 backdrop-blur-md p-6
              ${
                dark
                  ? "bg-black/50 text-gray-300"
                  : "bg-white/80 text-slate-800"
              }
            `}
          >
            <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>

            <ul
              className={`space-y-2 font-medium ${
                dark ? "text-gray-300" : "text-slate-700"
              }`}
            >
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1234-567890</li>
              <li>📧 support@cityfix.com</li>
            </ul>

            {/* Social Links */}
            <div
              className={`
                flex gap-5 mt-5 text-2xl
                ${dark ? "text-purple-400" : "text-blue-600"}
              `}
            >
              <motion.a whileHover={{ scale: 1.2 }} href="#">
                <i className="fa-brands fa-facebook"></i>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#">
                <i className="fa-brands fa-twitter"></i>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#">
                <i className="fa-brands fa-youtube"></i>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
