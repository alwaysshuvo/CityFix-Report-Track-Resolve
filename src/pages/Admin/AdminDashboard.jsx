const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value="128" />
        <StatCard title="Pending Issues" value="23" />
        <StatCard title="Resolved" value="91" />
        <StatCard title="Users" value="56" />
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

export default AdminDashboard;
