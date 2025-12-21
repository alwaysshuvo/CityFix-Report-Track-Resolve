import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";

const LatestResolved = () => {
  const [issues, setIssues] = useState([]);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    loadResolved();
  }, []);

  const loadResolved = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/issues?status=resolved&page=1&limit=4`
      );
      setIssues(res.data.issues || []);
    } catch (err) {
      console.error("Failed to load resolved", err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2
        className={`
          text-3xl md:text-4xl font-bold text-center mb-8
          ${dark ? "text-white" : "text-gray-800"}
        `}
      >
        Latest Resolved Issues
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {issues.map((issue, index) => (
          <motion.div
            key={issue._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`
              rounded-xl border cursor-pointer p-4 shadow
              ${
                dark
                  ? "bg-[#111] border-purple-500/20 shadow-[0_0_18px_rgba(168,85,247,0.25)] text-gray-200"
                  : "bg-white border-gray-200 hover:shadow-xl text-gray-800"
              }
            `}
          >
            {/* image */}
            <img
              src={
                issue.image ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt={issue.title}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3
              className={`
                text-xl font-semibold mt-4
                ${dark ? "text-white" : "text-gray-800"}
              `}
            >
              {issue.title}
            </h3>

            <p
              className={`
                text-sm mt-1
                ${dark ? "text-gray-400" : "text-gray-600"}
              `}
            >
              {issue.location}
            </p>

            <div className="mt-3 flex justify-between items-center">
              <span
                className={`
                  px-3 py-1 rounded text-xs font-semibold capitalize
                  ${
                    dark
                      ? "bg-purple-600/30 text-purple-300"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {issue.status}
              </span>

              <Link
                to={`/issue/${issue._id}`}
                className={`
                  btn btn-sm rounded-lg transition
                  ${
                    dark
                      ? "border-purple-500 text-purple-300 hover:bg-purple-900/30"
                      : "btn-outline btn-primary"
                  }
                `}
              >
                View
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All */}
      <div className="flex justify-center mt-10">
        <Link
          to="/all-issues"
          className={`
            px-6 py-3 rounded-lg shadow font-semibold
            ${
              dark
                ? "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }
          `}
        >
          View All Issues →
        </Link>
      </div>
    </section>
  );
};

export default LatestResolved;
