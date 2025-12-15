import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center px-5 
      bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
         <img src="https://i.ibb.co.com/MyqYxTGM/Gemini-Generated-Image-do4hpndo4hpndo4h.png" alt="Hero Illustration" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-2">🚦 Fast Issue Resolution</h3>
            <p className="text-gray-600">
              Issues are reviewed, assigned, and resolved with a clear workflow.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 
            rounded-2xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-2">⚡ Priority Boost</h3>
            <p className="text-white/90">
              Boost critical issues to get faster attention from authorities.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
