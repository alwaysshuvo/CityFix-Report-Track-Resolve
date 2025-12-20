import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const MyIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyIssues();
    }
  }, [user]);

  const fetchMyIssues = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/issues/user/${user.email}`
      );
      setIssues(res.data);
    } catch {
      Swal.fire("Error", "Failed to load your issues", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Issue?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/issues/${id}`);

      Swal.fire({
        icon: "success",
        title: "Issue Deleted",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchMyIssues();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
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
      <h1 className="text-3xl font-bold mb-6">My Reported Issues</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>

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

                <td>
                  {issue.assignedStaff ? (
                    <span className="text-sm">
                      {issue.assignedStaff.name}
                    </span>
                  ) : (
                    <span className="italic text-gray-400">
                      Not assigned
                    </span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  You haven’t reported any issues yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyIssues;
