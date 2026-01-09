import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";
import CitizenProgressChart from "../../components/dashboard/CitizenProgressChart";
import DashboardStatSkeleton from "../../components/skeletons/DashboardStatSkeleton";

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

        const myIssues = Array.isArray(res.data)
          ? res.data
          : res.data?.issues || [];

        setStats({
          total: myIssues.length,
          pending: myIssues.filter((i) => i.status === "pending").length,
          inProgress: myIssues.filter((i) => i.status === "in-progress").length,
          resolved: myIssues.filter((i) => i.status === "resolved").length,
        });
      } catch (err) {
        console.error("Dashboard stats error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div
      className={`px-4 py-6 sm:px-6 md:px-10 min-h-screen transition-all ${
        dark ? "bg-[#0B0B0B] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Citizen Dashboard
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Welcome, {user?.displayName || "Citizen"}
        </p>
      </motion.div>

      {/* ======================
           STATS
      ====================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => <DashboardStatSkeleton key={i} />)
        ) : (
          <>
            <StatCard title="Total" value={stats.total} type="primary" />
            <StatCard title="Pending" value={stats.pending} type="warning" />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              type="secondary"
            />
            <StatCard title="Resolved" value={stats.resolved} type="success" />
          </>
        )}
      </div>

      {/* ======================
           CHART
      ====================== */}
      {!loading && (
        <div className="mt-10">
          <CitizenProgressChart
            total={stats.total}
            resolved={stats.resolved}
            dark={dark}
          />
        </div>
      )}

      {/* ======================
           INFO
      ====================== */}
      <div
        className={`mt-10 rounded-xl p-5 border ${
          dark
            ? "bg-[#141414] border-gray-700 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">How it works</h2>
        <p className="text-sm leading-relaxed">
          Report public issues, track progress, and get notified when they are
          resolved. Your participation improves city services 🚀
        </p>
      </div>
    </div>
  );
};

/* =========================
   STAT CARD (THEME BASED)
========================= */
const StatCard = ({ title, value, type }) => {
  const colorMap = {
    primary: "from-indigo-500 to-indigo-600",
    secondary: "from-violet-500 to-purple-600",
    success: "from-emerald-500 to-green-600",
    warning: "from-amber-400 to-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 sm:p-5 text-white bg-gradient-to-r ${
        colorMap[type]
      } shadow-lg`}
    >
      <p className="text-xs opacity-90">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{value}</h2>
    </motion.div>
  );
};

export default UserDashboard;
