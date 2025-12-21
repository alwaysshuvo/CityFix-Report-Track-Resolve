import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AssignedIssues = () => {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchIssues();
    }
  }, [user]);

  const fetchIssues = async () => {
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
    try {
      await axios.patch(
        `http://localhost:5000/issues/status/${id}`,
        { status }
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchIssues();
    } catch {
      Swal.fire("Error", "Status update failed", "error");
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
              <th>Action</th>
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
                        : "badge-success"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {issue.priority}
                  </span>
                </td>

                <td className="flex gap-2">
                  {issue.status === "pending" && (
                    <button
                      onClick={() =>
                        updateStatus(issue._id, "in-progress")
                      }
                      className="btn btn-xs btn-info"
                    >
                      Start
                    </button>
                  )}

                  {issue.status === "in-progress" && (
                    <button
                      onClick={() =>
                        updateStatus(issue._id, "resolved")
                      }
                      className="btn btn-xs btn-success"
                    >
                      Resolve
                    </button>
                  )}
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
