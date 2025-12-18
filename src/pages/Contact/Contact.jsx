import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-slate-100 to-white">
      
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Contact <span className="text-blue-600">CityFix</span>
        </h1>
        <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
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
          className="bg-white shadow-xl rounded-2xl p-10 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div>
              <label className="font-semibold text-slate-700">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full mt-2 bg-slate-50"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="input input-bordered w-full mt-2 bg-slate-50"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message…"
                className="textarea textarea-bordered bg-slate-50 w-full mt-2"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
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
          className="relative rounded-2xl overflow-hidden bg-white border shadow-lg"
        >
          {/* Background Illustration */}
          <img
            src="https://i.ibb.co.com/4Pv2M23/Business-cuate.png"
            alt="Contact Illustration"
            className="object-cover w-full h-72 md:h-full"
          />

          {/* Transparent Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              Get in Touch
            </h3>

            <ul className="space-y-2 text-slate-700 font-medium">
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1234-567890</li>
              <li>📧 support@cityfix.com</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-5 mt-5 text-2xl text-blue-600">
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
