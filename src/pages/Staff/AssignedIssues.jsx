import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const AssignedIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/issues/staff/${user.email}`)
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      });
  }, [user]);

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
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assigned Issues</h1>

      <div className="bg-base-100 rounded-xl shadow overflow-x-auto border">
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
                  <span className="badge badge-info capitalize">
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : "badge-ghost"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>

                <td>
                  <select
                    className="select select-sm"
                    value={issue.status}
                    onChange={(e) =>
                      handleStatusChange(issue._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No assigned issues found
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
