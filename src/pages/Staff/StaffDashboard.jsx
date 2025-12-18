import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const StaffDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    assigned: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/issues/staff/${user.email}`)
      .then((res) => {
        const issues = res.data;

        setStats({
          assigned: issues.length,
          inProgress: issues.filter(i => i.status === "in-progress").length,
          resolved: issues.filter(i => i.status === "resolved").length,
        });
      });
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Assigned Issues" value={stats.assigned} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Resolved" value={stats.resolved} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-base-200 rounded-xl p-6 shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default StaffDashboard;
