import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/issues/${id}`)
      .then((res) => {
        setIssue(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Issue not found
      </div>
    );
  }

  const statusSteps = [
    "pending",
    "in-progress",
    "resolved",
    "closed",
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>

      {/* META */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="badge badge-outline">{issue.category}</span>

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

        <span className="badge badge-info">
          {issue.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-base-100 p-6 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-600">
          {issue.description}
        </p>
      </div>

      {/* INFO */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Reported By</h4>
          <p>{issue.authorEmail || "Anonymous"}</p>
          <p className="text-sm text-gray-500">
            {new Date(issue.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Assigned Staff</h4>
          {issue.assignedStaff ? (
            <>
              <p>{issue.assignedStaff.name}</p>
              <p className="text-sm text-gray-500">
                {issue.assignedStaff.email}
              </p>
            </>
          ) : (
            <p className="italic text-gray-400">
              Not assigned yet
            </p>
          )}
        </div>
      </div>

      {/* STATUS TIMELINE */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h4 className="font-semibold mb-4">Progress</h4>

        <ul className="steps w-full">
          {statusSteps.map((step) => (
            <li
              key={step}
              className={`step ${
                statusSteps.indexOf(step) <=
                statusSteps.indexOf(issue.status)
                  ? "step-primary"
                  : ""
              }`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IssueDetails;
