import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";

const MyIssues = () => {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5000/issues");

        // only issues created by this user
        const myIssues = res.data.filter(
          (issue) => issue.authorEmail === user.email
        );

        setIssues(myIssues);
      } catch (error) {
        console.error("Failed to load issues", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, [user]);

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

                <td className="capitalize">
                  {issue.category || "General"}
                </td>

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
                  <span
                    className={`badge badge-outline ${
                      issue.priority === "high"
                        ? "badge-error"
                        : issue.priority === "medium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {issue.priority || "normal"}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/issue/${issue._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  You have not reported any issues yet
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
