import { motion } from "framer-motion";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value="128" color="from-blue-500 to-blue-600" />
        <StatCard title="Pending Issues" value="23" color="from-yellow-500 to-yellow-600" />
        <StatCard title="Resolved Issues" value="91" color="from-green-500 to-green-600" />
        <StatCard title="Total Users" value="56" color="from-purple-500 to-purple-600" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r ${color}`}
  >
    <h3 className="text-sm opacity-90">{title}</h3>
    <p className="text-3xl font-extrabold mt-2">{value}</p>
  </motion.div>
);

export default AdminDashboard;
