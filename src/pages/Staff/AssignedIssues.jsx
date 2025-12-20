import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const AssignedIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchAssignedIssues();
    }
  }, [user]);

  const fetchAssignedIssues = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/issues/staff/${user.email}`
      );
      setIssues(res.data);
    } catch {
      Swal.fire("Error", "Failed to load assigned issues", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:5000/issues/status/${id}`,
      { status }
    );

    fetchAssignedIssues();

    Swal.fire({
      icon: "success",
      title: "Status Updated",
      timer: 1200,
      showConfirmButton: false,
    });
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
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>

                <td>
                  <span
                    className={`badge ${
                      issue.status === "pending"
                        ? "badge-warning"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : issue.status === "resolved"
                        ? "badge-success"
                        : "badge-neutral"
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
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      updateStatus(issue._id, e.target.value)
                    }
                    className="select select-sm"
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
