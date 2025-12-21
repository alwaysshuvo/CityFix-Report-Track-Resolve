import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadMyIssues();
    }
  }, [user]);

  const loadMyIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/issues/user/${user.email}`
      );
      setIssues(res.data || []);
    } catch (err) {
      Swal.fire("Error", "Failed to load your issues", "error");
    } finally {
      setLoading(false);
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
      className={`max-w-5xl mx-auto p-4 min-h-screen transition-all duration-300
      ${dark ? "bg-[#0d0d0d] text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-3xl font-bold mb-6">My Reported Issues</h1>

      <div
        className={`overflow-x-auto rounded-xl shadow border transition
        ${dark ? "bg-[#161616] border-[#2c2c2c]" : "bg-white border-gray-200"}`}
      >
        <table className="table table-zebra">
          <thead className={`${dark ? "bg-[#222]" : "bg-base-200"} text-sm uppercase`}>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className="font-medium">{issue.title}</td>

                <td>
                  <span
                    className={`badge capitalize ${
                      issue.status === "pending"
                        ? "badge-warning"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : issue.status === "resolved"
                        ? "badge-success"
                        : "badge-outline"
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
                        : "badge-outline"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>

                <td>
                  {issue.assignedStaff ? (
                    <div>
                      <p className="font-medium">{issue.assignedStaff.name}</p>
                      <p className="text-xs opacity-60">
                        {issue.assignedStaff.email}
                      </p>
                    </div>
                  ) : (
                    <span className="italic opacity-60">Not Assigned</span>
                  )}
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 opacity-60">
                  You haven’t reported any issues yet.
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
