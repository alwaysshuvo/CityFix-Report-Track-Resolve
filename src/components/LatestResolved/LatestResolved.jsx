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
    <section className="relative max-w-7xl mx-auto px-4 pt-24">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span
          className={`text-sm font-semibold uppercase tracking-wide ${
            dark ? "text-purple-400" : "text-indigo-600"
          }`}
        >
          Recent Success
        </span>

        <h2
          className={`mt-2 text-3xl md:text-4xl font-extrabold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Latest{" "}
          <span
            className={
              dark
                ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                : "text-indigo-600"
            }
          >
            Resolved
          </span>{" "}
          Issues
        </h2>

        <p
          className={`mt-4 max-w-2xl mx-auto text-lg ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          See how reported problems are being solved across the city with real,
          transparent updates.
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* Skeleton */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <IssueCardSkeleton key={i} />
          ))}

        {/* Data */}
        {!loading &&
          issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className={`
                group relative rounded-2xl overflow-hidden
                border transition-all
                ${
                  dark
                    ? "bg-[#0f111a] border-white/10 shadow-[0_0_22px_rgba(168,85,247,0.25)]"
                    : "bg-white border-gray-200 shadow hover:shadow-2xl"
                }
              `}
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={issue.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={issue.title}
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* STATUS BADGE */}
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize backdrop-blur ${
                    dark
                      ? "bg-purple-600/30 text-purple-300"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {issue.title}
                </h3>

                <p className="text-sm mt-1 line-clamp-1 opacity-70">
                  {issue.location}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    to={`/issue/${issue._id}`}
                    className={`text-sm font-semibold transition ${
                      dark
                        ? "text-purple-300 hover:text-purple-200"
                        : "text-indigo-600 hover:text-indigo-700"
                    }`}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* CTA */}
      <div className="flex justify-center mt-16">
        <Link
          to="/all-issues"
          className={`
            inline-flex items-center gap-2
            px-9 py-3 rounded-xl font-semibold tracking-wide
            transition shadow-lg
            ${
              dark
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30 hover:opacity-90"
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
