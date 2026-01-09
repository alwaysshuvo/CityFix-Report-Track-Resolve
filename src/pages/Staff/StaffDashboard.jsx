import { useContext } from "react";
import { Link } from "react-router-dom";
import useStaffIssues from "../../hooks/useStaffIssues";
import { ThemeContext } from "../../provider/ThemeContext";
import StaffIssueChart from "../../components/dashboard/StaffIssueChart";
import DashboardStatSkeleton from "../../components/skeletons/DashboardStatSkeleton";

const StaffDashboard = () => {
  const { issues, loading, error } = useStaffIssues();
  const { dark } = useContext(ThemeContext);

  // Normalize status values
  const completedStatuses = ["resolved", "completed", "done"];
  const progressStatuses = ["in-progress", "working"];

  const totalAssigned = issues.length;
  const inProgress = issues.filter((i) =>
    progressStatuses.includes(i.status)
  ).length;
  const resolved = issues.filter((i) =>
    completedStatuses.includes(i.status)
  ).length;

  const chartData = [
    { name: "Assigned", value: totalAssigned },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 p-4 md:p-8 min-h-screen overflow-x-hidden ${
        dark ? "bg-[#0B0B0B] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* TITLE */}
      <h1
        className={`text-3xl md:text-4xl font-bold mb-10 ${
          dark ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Staff Dashboard
      </h1>

      {/* =========================
           STAT CARDS
      ========================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <DashboardStatSkeleton key={i} />
          ))
        ) : (
          <>
            <StatCard
              title="Total Assigned"
              value={totalAssigned}
              accent="blue"
              dark={dark}
            />
            <StatCard
              title="In Progress"
              value={inProgress}
              accent="yellow"
              dark={dark}
            />
            <StatCard
              title="Resolved"
              value={resolved}
              accent="green"
              dark={dark}
            />
          </>
        )}
      </div>

      {/* =========================
           CHART
      ========================= */}
      {!loading && (
        <div className="mb-10">
          <StaffIssueChart data={chartData} dark={dark} />
        </div>
      )}

      {/* =========================
           ASSIGNED ISSUES TABLE
      ========================= */}
      <div
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
        }`}
      >
        <table className="table w-full">
          <thead
            className={`text-sm ${
              dark
                ? "bg-[#1e1e1e] text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody
            className={`${
              dark
                ? "divide-y divide-[#333]"
                : "divide-y divide-gray-200"
            }`}
          >
            {!loading &&
              issues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className={`transition ${
                    dark
                      ? index % 2 === 0
                        ? "bg-[#0F0F0F]"
                        : "bg-[#111]"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="font-medium">{issue.title}</td>
                  <td className="capitalize">
                    {issue.category || "N/A"}
                  </td>

                  <td>
                    <span
                      className={`badge capitalize ${
                        issue.status === "pending"
                          ? "badge-warning"
                          : progressStatuses.includes(issue.status)
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge capitalize ${
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

                  <td className="text-center">
                    <Link
                      to={`/issue/${issue._id}`}
                      className={`btn btn-xs rounded-md ${
                        dark
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "btn-primary"
                      }`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

            {!loading && issues.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 opacity-60">
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

const StatCard = ({ title, value, accent, dark }) => (
  <div
    className={`rounded-xl p-6 shadow border transition-all duration-300 flex flex-col items-start ${
      dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
    }`}
  >
    <h3 className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
      {title}
    </h3>

    <p
      className={`text-3xl font-bold mt-2 ${
        accent === "blue"
          ? "text-blue-500"
          : accent === "yellow"
          ? "text-yellow-500"
          : "text-green-500"
      }`}
    >
      {value}
    </p>
  </div>
);

export default StaffDashboard;
