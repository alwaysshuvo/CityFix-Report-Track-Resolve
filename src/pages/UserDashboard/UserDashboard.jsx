import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const UserDashboard = () => {
  const { dark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH USER ISSUE STATS
     CORRECT FIELD → reporterEmail
     USE BACKEND ROUTE DIRECTLY
  ========================== */
  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        // fetch ONLY user's issues
        const res = await axios.get(
          `http://localhost:5000/issues/user/${user.email}`
        );

        const myIssues = res.data || [];

        const pending = myIssues.filter(
          (i) => i.status === "pending"
        ).length;

        const inProgress = myIssues.filter(
          (i) => i.status === "in-progress"
        ).length;

        const resolved = myIssues.filter(
          (i) => i.status === "resolved"
        ).length;

        setStats({
          total: myIssues.length,
          pending,
          inProgress,
          resolved,
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  /* =========================
     LOADER
  ========================== */
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`p-6 md:p-10 min-h-screen transition-all ${
        dark ? "bg-[#111] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold">
          Citizen Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome, {user?.displayName || "Citizen"}
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value={stats.total} color="from-blue-500 to-blue-600" />
        <StatCard title="Pending" value={stats.pending} color="from-yellow-400 to-yellow-500" />
        <StatCard title="In Progress" value={stats.inProgress} color="from-purple-500 to-purple-600" />
        <StatCard title="Resolved" value={stats.resolved} color="from-green-500 to-green-600" />
      </div>

      {/* INFO BOX */}
      <div
        className={`mt-12 rounded-xl p-6 border ${
          dark
            ? "bg-[#181818] border-gray-700 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">
          How it works
        </h2>
        <p className="text-sm leading-relaxed">
          You can report city issues, track their status, and get updates
          when they are resolved. Your reports help improve public services 🚀
        </p>
      </div>
    </div>
  );
};

/* =========================
   STAT CARD
========================== */
const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-5 text-white bg-gradient-to-r ${color} shadow-lg`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-3xl font-extrabold mt-2">{value}</h2>
    </motion.div>
  );
};

export default UserDashboard;
