import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-6">

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* LEFT: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <h1 className="text-7xl font-extrabold text-primary mb-4">
            404
          </h1>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Oops! The page you are looking for doesn’t exist or has been moved.
            Let’s get you back to a safer place.
          </p>

          <Link
            to="/"
            className="inline-block btn btn-primary px-8"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* RIGHT: ILLUSTRATION / IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          {/* 
            তুমি চাইলে এখানে image replace করতে পারো 
            example: /404.svg, /404.png etc
          */}
          <div className="w-72 h-72 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 
                          flex items-center justify-center text-white shadow-xl">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl font-extrabold"
            >
              🚧
            </motion.span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;
