import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const email = user?.email;

  /** ==========================
   * LOAD ISSUE (TanStack Query)
   =========================== */
  const {
    data: issue,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/issues/${id}`);
      return res.data;
    },
  });

  /** ==========================
   * UPVOTE
   =========================== */
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return axios.patch(`${import.meta.env.VITE_API_BASE}/issues/upvote/${id}`, {
        email,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Upvoted!", "success");
      queryClient.invalidateQueries(["issue", id]);
    },
    onError: (err) => {
      Swal.fire("Oops!", err.response?.data?.error || "Cannot upvote", "error");
    },
  });

  const handleUpvote = () => {
    if (!email) return navigate("/login");
    upvoteMutation.mutate();
  };

  /** ==========================
   * BOOST (Stripe Checkout)
   =========================== */
  const handleBoost = async () => {
    if (!email) return navigate("/login");
    if (issue.priority === "high")
      return Swal.fire("Info", "Already boosted", "info");

    const confirm = await Swal.fire({
      title: "Boost Priority?",
      text: "Pay 100 BDT to highlight this issue",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Proceed to Pay",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/issues/boost`, {
        email,
        issueId: id,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      Swal.fire("Payment Failed", "Try again later", "error");
    }
  };

  /** ==========================
   * DELETE (only reporter+pending)
   =========================== */
  const handleDelete = async () => {
    const ok = await Swal.fire({
      title: "Delete Issue?",
      text: "This cannot be undone",
      showCancelButton: true,
      confirmButtonText: "Delete",
      icon: "warning",
    });
    if (!ok.isConfirmed) return;

    await axios.delete(`${import.meta.env.VITE_API_BASE}/issues/${id}`);
    Swal.fire("Deleted!", "Issue removed", "success");
    navigate("/dashboard/my-issues");
  };

  /** ==========================
   * ADMIN REJECT ISSUE
   =========================== */
  const handleReject = async () => {
    const ok = await Swal.fire({
      title: "Reject?",
      text: "Mark as rejected?",
      showCancelButton: true,
      confirmButtonText: "Reject",
      icon: "warning",
    });
    if (!ok.isConfirmed) return;

    await axios.patch(`${import.meta.env.VITE_API_BASE}/issues/reject/${id}`);
    Swal.fire("Done", "Issue rejected", "success");
    refetch();
  };

  /** ==========================
   * STAFF / ADMIN STATUS WORKFLOW
   =========================== */
  const statusMutation = useMutation({
    mutationFn: async (nextStatus) => {
      return axios.patch(
        `${import.meta.env.VITE_API_BASE}/issues/status/${id}`,
        { status: nextStatus, by: email }
      );
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Status changed", "success");
      queryClient.invalidateQueries(["issue", id]);
    },
  });

  const allowedStatus = ["pending", "in-progress", "working", "resolved", "closed"];

  /** UI Loading States */
  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-lg" />
      </div>
    );
  }

  if (!issue) return <p className="text-center mt-20">Not Found</p>;

  return (
    <div
      className={`max-w-5xl mx-auto p-6 rounded-xl shadow mt-10 ${
        dark ? "bg-[#111] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-3">{issue.title}</h1>

      {/* IMAGE */}
      {issue.image && (
        <img
          src={issue.image}
          className="rounded-xl w-full h-80 object-cover mb-4"
        />
      )}

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-5">
        <span className="badge badge-info">Status: {issue.status}</span>
        <span className="badge badge-warning">Priority: {issue.priority}</span>
        <span className="badge badge-outline capitalize">{issue.category}</span>
        <span className="badge">📍 {issue.location}</span>
        <span className="badge badge-primary">
          Upvotes: {issue.upvotes?.length || 0}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="mb-4">{issue.description}</p>

      {/* REPORTER INFO */}
      <h3 className="font-semibold mt-2">Reported By</h3>
      <p className="opacity-75">{issue.reporterEmail}</p>

      {/* ASSIGNED STAFF */}
      <h3 className="font-semibold mt-4">Assigned Staff</h3>
      {issue.assignedStaff ? (
        <p>
          {issue.assignedStaff.name} ({issue.assignedStaff.email})
        </p>
      ) : (
        <p className="italic opacity-60">Not Assigned</p>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2 mt-6">

        {/* UPVOTE */}
        <button className="btn btn-primary btn-sm" onClick={handleUpvote}>
          👍 Upvote ({issue.upvotes?.length})
        </button>

        {/* BOOST */}
        <button className="btn btn-warning btn-sm" onClick={handleBoost}>
          🚀 Boost (100 BDT)
        </button>

        {/* DELETE (Citizen owner only & pending) */}
        {email === issue.reporterEmail && issue.status === "pending" && (
          <button className="btn btn-error btn-sm" onClick={handleDelete}>
            Delete
          </button>
        )}

        {/* ADMIN Reject if pending */}
        {role === "admin" && issue.status === "pending" && (
          <button className="btn btn-error btn-sm" onClick={handleReject}>
            Reject
          </button>
        )}

        {/* STAFF / ADMIN STATUS CONTROLS */}
        {(role === "staff" || role === "admin") && (
          <select
            className="select select-bordered select-sm"
            onChange={(e) => statusMutation.mutate(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Change Status
            </option>
            {allowedStatus.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* TIMELINE */}
      <h2 className="text-2xl font-semibold mt-10 mb-3">📌 Issue Timeline</h2>
      <div className="border-l-4 pl-4 space-y-4">
        {issue.timeline
          ?.slice()
          .reverse()
          .map((log, idx) => (
            <div key={idx} className="border rounded p-3">
              <p className="capitalize font-semibold">{log.status}</p>
              <p>{log.message}</p>
              <small className="opacity-50">
                {log.by} — {new Date(log.time).toLocaleString()}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IssueDetails;
