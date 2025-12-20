import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/stats")
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
    return (
      <div className="text-center text-red-500 mt-20">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
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
