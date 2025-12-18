const StaffDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Assigned Issues" value="12" />
        <StatCard title="In Progress" value="5" />
        <StatCard title="Resolved Today" value="3" />
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
