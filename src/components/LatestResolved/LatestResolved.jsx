import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";
import IssueCardSkeleton from "../../components/skeletons/IssueCardSkeleton";

const LatestResolved = () => {
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH RESOLVED ISSUES
  ========================= */
  const loadResolved = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/issues`,
        {
          params: {
            status: "resolved",
            page: 1,
            limit: 4,
          },
        }
      );

      setIssues(res.data.issues || []);
    } catch (err) {
      console.error("❌ Failed to load resolved issues", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResolved();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        Latest Resolved Issues
      </h2>

      {/* =========================
           GRID
      ========================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {/* 🔹 Skeleton */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <IssueCardSkeleton key={i} />
          ))}

        {/* 🔹 Data */}
        {!loading &&
          issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className={`rounded-xl border p-4 shadow cursor-pointer ${
                dark
                  ? "bg-[#111] border-purple-500/20 text-gray-200"
                  : "bg-white border-gray-200 hover:shadow-xl text-gray-800"
              }`}
            >
              {/* Image */}
              <img
                src={
                  issue.image || "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={issue.title}
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-4">
                {issue.title}
              </h3>

              <p className="text-sm opacity-70 mt-1">
                {issue.location}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize ${
                    dark
                      ? "bg-purple-600/30 text-purple-300"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.status}
                </span>

                <Link
                  to={`/issue/${issue._id}`}
                  className={`btn btn-sm ${
                    dark
                      ? "border-purple-500 text-purple-300 hover:bg-purple-900/30"
                      : "btn-outline btn-primary"
                  }`}
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* =========================
           VIEW ALL
      ========================= */}
      <div className="flex justify-center mt-10">
        <Link
          to="/all-issues"
          className={`px-6 py-3 rounded-lg font-semibold shadow ${
            dark
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          View All Issues →
        </Link>
      </div>
    </section>
  );
};

export default LatestResolved;
