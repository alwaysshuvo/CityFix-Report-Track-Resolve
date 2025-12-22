import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = user?.email;

  useEffect(() => {
    loadIssue();
  }, [id]);

  const loadIssue = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/issues/${id}`);
      setIssue(res.data);
    } catch {
      Swal.fire("Error", "Failed to load issue", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
      UPVOTE (Only Once)
  ======================= */
  const handleUpvote = async () => {
    if (!email) return navigate("/login");

    if (issue.reporterEmail === email) {
      return Swal.fire("Oops!", "You cannot upvote your own issue", "warning");
    }

    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE}/issues/upvote/${id}`,
      { email }
    );

    if (res.data.message === "Already upvoted") {
      return Swal.fire("Info", "You already upvoted", "info");
    }

    Swal.fire("Success!", "Upvoted", "success");
    loadIssue();
  };

  /* ======================
      BOOST PRIORITY (Pay 100)
  ======================= */
  const handleBoost = async () => {
    if (!email) return navigate("/login");

    if (issue.priority === "high") {
      return Swal.fire("Info", "This issue is already boosted", "info");
    }

    // Fake payment simulation
    const ok = await Swal.fire({
      title: "Boost Priority?",
      text: "Pay 100 taka to boost this issue",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay 100 tk",
    });

    if (!ok.isConfirmed) return;

    await axios.patch(`${import.meta.env.VITE_API_BASE}/issues/boost/${id}`, {
      email,
      amount: 100,
    });

    Swal.fire("Done!", "Priority boosted!", "success");
    loadIssue();
  };

  /* ======================
      STATUS UPDATE (Admin/Staff)
  ======================= */
  const updateStatus = async (status) => {
    await axios.patch(`${import.meta.env.VITE_API_BASE}/issues/status/${id}`, {
      status,
      by: email,
    });

    Swal.fire("Updated!", "Status updated", "success");
    loadIssue();
  };

  /* ======================
      DELETE ISSUE (Citizen Only)
  ======================= */
  const handleDelete = async () => {
    const ok = await Swal.fire({
      title: "Delete Issue?",
      text: "This action cannot be undone",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!ok.isConfirmed) return;

    await axios.delete(`${import.meta.env.VITE_API_BASE}/issues/${id}`);
    Swal.fire("Deleted!", "Issue removed", "success");
    navigate("/dashboard/my-issues");
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!issue)
    return <p className="text-center mt-20">Issue not found</p>;

  return (
    <div
      className={`max-w-5xl mx-auto p-6 rounded-xl shadow mt-10
        ${dark ? "bg-[#111] text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>

      {/* Image */}
      {issue.image && (
        <img
          src={issue.image}
          className="rounded-xl w-full h-80 object-cover mb-4"
        />
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="badge badge-info">Status: {issue.status}</span>
        <span className="badge badge-warning">Priority: {issue.priority}</span>
        <span className="badge badge-outline">{issue.category}</span>
        {issue.location && <span className="badge">📍 {issue.location}</span>}
        <span className="badge badge-primary">
          Upvotes: {issue.upvotes?.length || 0}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4">{issue.description}</p>

      {/* Reporter */}
      <div className="mb-4">
        <h3 className="font-semibold">Reported By</h3>
        <p>{issue.reporterEmail}</p>
      </div>

      {/* Assigned Staff */}
      <div className="mb-6">
        <h3 className="font-semibold">Assigned Staff</h3>
        {issue.assignedStaff ? (
          <p>
            {issue.assignedStaff.name} ({issue.assignedStaff.email})
          </p>
        ) : (
          <p className="italic opacity-60">Not assigned yet</p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3 my-5">
        {/* UPVOTE */}
        <button className="btn btn-primary" onClick={handleUpvote}>
          👍 Upvote ({issue.upvotes?.length})
        </button>

        {/* BOOST */}
        <button className="btn btn-warning" onClick={handleBoost}>
          🚀 Boost Issue
        </button>

        {/* EDIT/DELETE (only if owner & pending) */}
        {email === issue.reporterEmail && issue.status === "pending" && (
          <>
            <button className="btn btn-info">Edit Issue</button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}

        {/* ADMIN / STAFF STATUS CONTROL */}
        {(role === "admin" || role === "staff") && (
          <>
            <button
              className="btn btn-outline"
              onClick={() => updateStatus("pending")}
            >
              Pending
            </button>
            <button
              className="btn btn-info"
              onClick={() => updateStatus("in-progress")}
            >
              In Progress
            </button>
            <button
              className="btn btn-success"
              onClick={() => updateStatus("resolved")}
            >
              Resolved
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => updateStatus("closed")}
            >
              Closed
            </button>
          </>
        )}
      </div>

      {/* ========= TIMELINE ========= */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        📝 Issue Timeline
      </h2>

      <div className="border-l-4 pl-5 space-y-4">
        {issue.timeline
          ?.slice()
          .reverse()
          .map((t, i) => (
            <div key={i} className="border rounded p-3">
              <p className="font-semibold capitalize">{t.status}</p>
              <p>{t.message}</p>
              <small className="opacity-70">
                {t.by} — {new Date(t.time).toLocaleString()}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IssueDetails;
