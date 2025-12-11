import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="pt-28 pb-20 bg-base-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold">
          Contact <span className="text-primary">CityFix</span>
        </h1>
        <p className="mt-2 text-gray-600 text-lg max-w-xl mx-auto">
          Need help or want to report an issue? Send us a message — we respond
          quickly!
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-5">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-lg rounded-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

          <form className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full mt-2"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-2"
              />
            </div>

            <div>
              <label className="font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full mt-2"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
    rounded-xl p-8 shadow-xl border border-white/20
    bg-gradient-to-br from-purple-500/80 via-fuchsia-500/70 to-pink-400/80
    backdrop-blur-sm text-white relative overflow-hidden
  "
        >
          <div className="absolute inset-0 opacity-10 bg-[url('/contact-bg.png')] bg-cover bg-center pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="space-y-4 text-white/90">
              <p>
                📍 <span className="font-medium">Address:</span> Dhaka,
                Bangladesh
              </p>
              <p>
                📞 <span className="font-medium">Phone:</span> +880 1234-567890
              </p>
              <p>
                📧 <span className="font-medium">Email:</span>{" "}
                support@cityfix.com
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-8"
            >
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-white text-2xl"
              >
                <i className="fa-brands fa-facebook"></i>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-white text-2xl"
              >
                <i className="fa-brands fa-twitter"></i>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-white text-2xl"
              >
                <i className="fa-brands fa-youtube"></i>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
