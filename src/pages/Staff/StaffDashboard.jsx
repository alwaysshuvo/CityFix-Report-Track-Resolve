import useStaffIssues from "../../hooks/useStaffIssues";

const StaffDashboard = () => {
  const { issues, loading, error } = useStaffIssues();

  const pending = issues.filter(i => i.status === "pending").length;
  const inProgress = issues.filter(i => i.status === "in-progress").length;
  const resolved = issues.filter(i => i.status === "resolved").length;

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
      <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Assigned" value={issues.length} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="Resolved" value={resolved} />
      </div>

      {/* Assigned Issues */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(issue => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.category || "N/A"}</td>
                <td>
                  <span className="badge badge-outline">
                    {issue.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : issue.priority === "medium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No assigned issues
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default StaffDashboard;
