import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const MyIssues = () => {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadMyIssues();
    }
  }, [user]);

  const loadMyIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/issues");

      // শুধু logged-in user এর issues
      const myIssues = res.data.filter(
        (issue) => issue.reporterEmail === user.email
      );

      setIssues(myIssues);
    } catch {
      Swal.fire("Error", "Failed to load issues", "error");
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
    <div>
      <h1 className="text-3xl font-bold mb-6">My Reported Issues</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
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

                {/* STATUS */}
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

                {/* PRIORITY */}
                <td>
                  <span className="badge badge-outline">
                    {issue.priority}
                  </span>
                </td>

                {/* ASSIGNED STAFF */}
                <td>
                  {issue.assignedStaff ? (
                    <div>
                      <p className="font-medium">
                        {issue.assignedStaff.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {issue.assignedStaff.email}
                      </p>
                    </div>
                  ) : (
                    <span className="italic text-gray-400">
                      Not Assigned
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
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
