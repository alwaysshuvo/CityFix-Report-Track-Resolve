import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeContext";

const AssignedIssues = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchIssues();
  }, [user]);

  const fetchIssues = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE}/issues/staff/${user.email}`
    );

    const list = Array.isArray(res.data?.issues) ? res.data.issues : [];
    setIssues(list);
  } catch {
    Swal.fire("Error", "Failed to load assigned issues", "error");
    setIssues([]);
  } finally {
    setLoading(false);
  }
};


  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE}/issues/status/${id}`,
        {
          status: newStatus,
          by: user.email,
        }
      );

      Swal.fire({
        icon: "success",
        title: `Marked as ${newStatus}!`,
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
    <div
      className={`transition-all duration-300 p-4 md:p-8 min-h-screen ${
        dark ? "bg-[#0B0B0B] text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl md:text-4xl font-bold mb-10 ${
          dark ? "text-indigo-400" : "text-indigo-700"
        }`}
      >
        Assigned Issues
      </h1>

      <div
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
        }`}
      >
        <table className="table w-full">
          <thead
            className={`text-sm ${
              dark ? "bg-[#1e1e1e] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody
            className={`${
              dark ? "divide-y divide-[#333]" : "divide-y divide-gray-200"
            }`}
          >
            {issues.map((issue, index) => (
              <tr
                key={issue._id}
                className={`
                  transition
                  ${
                    dark
                      ? index % 2 === 0
                        ? "bg-[#0F0F0F]"
                        : "bg-[#151515]"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                `}
              >
                <td className="font-medium">{issue.title}</td>

                <td>
                  <span
                    className={`badge badge-md capitalize ${
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

                <td className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/issue/${issue._id}`)}
                    className={`btn btn-xs rounded-md ${
                      dark
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "btn-primary"
                    }`}
                  >
                    View
                  </button>

                  {issue.status === "pending" && (
                    <button
                      className="btn btn-xs btn-info rounded-md"
                      onClick={() => updateStatus(issue._id, "in-progress")}
                    >
                      Start
                    </button>
                  )}

                  {issue.status === "in-progress" && (
                    <button
                      className="btn btn-xs btn-success rounded-md"
                      onClick={() => updateStatus(issue._id, "resolved")}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 opacity-60">
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
