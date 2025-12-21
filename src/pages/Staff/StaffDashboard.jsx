import { useContext } from "react";
import useStaffIssues from "../../hooks/useStaffIssues";
import { ThemeContext } from "../../provider/ThemeContext";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  const { issues, loading, error } = useStaffIssues();
  const { dark } = useContext(ThemeContext);

  // Normalize status values
  const completedStatuses = ["resolved", "completed", "done"];
  const progressStatuses = ["in-progress", "working"];
  
  const pending = issues.filter(i => i.status === "pending").length;
  const inProgress = issues.filter(i => progressStatuses.includes(i.status)).length;
  const resolved = issues.filter(i => completedStatuses.includes(i.status)).length;

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
    <div className={`transition ${dark ? "text-gray-200" : "text-gray-900"}`}>
      <h1
        className={`text-3xl font-bold mb-8 ${
          dark ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Staff Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Assigned" value={issues.length} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="Resolved" value={resolved} />
      </div>

      {/* Assigned Issues */}
      <div
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
        }`}
      >
        <table className="table">
          <thead
            className={`${
              dark ? "bg-[#1e1e1e] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.category || "N/A"}</td>
                <td>
                  <span
                    className={`badge badge-outline ${
                      dark ? "border-gray-500 text-gray-300" : ""
                    }`}
                  >
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

                <td>
                  <Link
                    className={`btn btn-xs ${
                      dark
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "btn-primary"
                    }`}
                    to={`/issue/${issue._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-60">
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
