import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/stats", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard title="Total Issues" value={stats.totalIssues} />
        <StatCard title="Pending" value={stats.pendingIssues} />
        <StatCard title="In Progress" value={stats.inProgressIssues} />
        <StatCard title="Resolved" value={stats.resolvedIssues} />
        <StatCard title="Citizens" value={stats.totalUsers} />
        <StatCard title="Staff" value={stats.totalStaff} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-base-200 rounded-xl p-6 shadow">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
