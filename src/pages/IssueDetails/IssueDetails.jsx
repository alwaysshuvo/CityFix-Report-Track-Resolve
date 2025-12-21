import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";

const IssueDetails = () => {
  const { id } = useParams();
  const { role } = useRole();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/issues/${id}`);
      setIssue(res.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load issue",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/issues/status/${id}`, {
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchIssue();
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

  if (!issue) {
    return <p className="text-center mt-20">Issue not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>

      {/* Image */}
      {issue.image && (
        <img
          src={issue.image}
          alt={issue.title}
          className="rounded-xl w-full h-72 object-cover mb-4"
        />
      )}

      {/* Description */}
      <p className="text-gray-500 mb-4">{issue.description}</p>

      {/* Meta Badges */}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="badge badge-info capitalize">
          Status: {issue.status}
        </span>

        <span className="badge badge-warning capitalize">
          Priority: {issue.priority}
        </span>

        {issue.location && (
          <span className="badge badge-outline">📍 {issue.location}</span>
        )}

        {issue.category && (
          <span className="badge badge-outline capitalize">
            Category: {issue.category}
          </span>
        )}
      </div>

      {/* Reporter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Reported By</h3>
        <p>{issue.reporterEmail}</p>
      </div>

      {/* Assigned Staff */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Assigned Staff</h3>
        {issue.assignedStaff ? (
          <p>
            {issue.assignedStaff.name} ({issue.assignedStaff.email})
          </p>
        ) : (
          <p className="italic text-gray-400">Not assigned yet</p>
        )}
      </div>

      {/* ADMIN / STAFF ACTION */}
      {(role === "admin" || role === "staff") && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => updateStatus("pending")}
            className="btn btn-sm btn-outline"
          >
            Pending
          </button>

          <button
            onClick={() => updateStatus("in-progress")}
            className="btn btn-sm btn-info"
          >
            In Progress
          </button>

          <button
            onClick={() => updateStatus("resolved")}
            className="btn btn-sm btn-success"
          >
            Resolved
          </button>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
