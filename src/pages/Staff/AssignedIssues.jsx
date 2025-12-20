import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AssignedIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Load assigned issues
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/issues/staff/${user.email}`)
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // 🔁 Update issue status
  const handleStatusChange = async (issueId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/issues/status/${issueId}`,
        { status }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === issueId ? { ...issue, status } : issue
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assigned Issues</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>

                <td>
                  <span className={`badge ${
                    issue.status === "pending"
                      ? "badge-warning"
                      : issue.status === "in-progress"
                      ? "badge-info"
                      : "badge-success"
                  }`}>
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span className="badge badge-error">
                    {issue.priority}
                  </span>
                </td>

                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={issue.status}
                    onChange={(e) =>
                      handleStatusChange(issue._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
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

export default AssignedIssues;
