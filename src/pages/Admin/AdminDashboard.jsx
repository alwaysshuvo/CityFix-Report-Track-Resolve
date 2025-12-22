import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/admin/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load admin statistics");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  return (
    <div
      className={`p-4 sm:p-6 md:p-8 min-h-screen transition-all duration-300
      ${dark ? "bg-[#0B0B0B] text-white" : "bg-white text-gray-900"}`}
    >
      <h1
        className={`text-3xl md:text-4xl font-bold mb-10 text-center 
        ${dark ? "text-blue-400" : "text-blue-700"}`}
      >
        Admin Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard title="Total Issues" value={stats.totalIssues} dark={dark} />
        <StatCard title="Pending" value={stats.pendingIssues} dark={dark} />
        <StatCard title="In Progress" value={stats.inProgressIssues} dark={dark} />
        <StatCard title="Resolved" value={stats.resolvedIssues} dark={dark} />
        <StatCard title="Citizens" value={stats.totalUsers} dark={dark} />
        <StatCard title="Staff" value={stats.totalStaff} dark={dark} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, dark }) => (
  <div
    className={`
      rounded-xl p-5 shadow-xl border text-center transition-all duration-300
      hover:scale-[1.03]
      ${dark ? "bg-[#1b1b1b] border-[#3a3a3a]" : "bg-white border-gray-300"}
    `}
  >
    <h3
      className={`text-sm font-medium mb-2 ${
        dark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {title}
    </h3>
    <p
      className={`text-3xl font-bold ${
        dark ? "text-yellow-400" : "text-blue-700"
      }`}
    >
      {value}
    </p>
  </div>
);

export default AdminDashboard;
