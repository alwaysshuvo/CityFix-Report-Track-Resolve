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

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/issues/user/${user.email}`
        );

        const myIssues = res.data || [];

        const pending = myIssues.filter((i) => i.status === "pending").length;
        const inProgress = myIssues.filter((i) => i.status === "in-progress").length;
        const resolved = myIssues.filter((i) => i.status === "resolved").length;

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

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`px-4 py-6 sm:px-6 md:px-10 min-h-screen transition-all ${
        dark ? "bg-[#111] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold break-words">
          Citizen Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 break-all">
          Welcome, {user?.displayName || "Citizen"}
        </p>
      </motion.div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total" value={stats.total} color="from-blue-500 to-blue-600" />
        <StatCard title="Pending" value={stats.pending} color="from-yellow-400 to-yellow-500" />
        <StatCard title="In Progress" value={stats.inProgress} color="from-purple-500 to-purple-600" />
        <StatCard title="Resolved" value={stats.resolved} color="from-green-500 to-green-600" />
      </div>

      {/* INFO BOX */}
      <div
        className={`mt-8 sm:mt-12 rounded-xl p-4 sm:p-6 border ${
          dark
            ? "bg-[#181818] border-gray-700 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          How it works
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed">
          You can report city issues, track their status, and receive updates
          when they are resolved. Your reports help improve public services 🚀
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-3 sm:p-5 text-white bg-gradient-to-r ${color} shadow-lg flex flex-col justify-center`}
    >
      <p className="text-[10px] sm:text-sm opacity-90">{title}</p>
      <h2 className="text-xl sm:text-3xl font-extrabold mt-1 sm:mt-2">{value}</h2>
    </motion.div>
  );
};

export default UserDashboard;
