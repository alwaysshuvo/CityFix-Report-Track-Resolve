import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import IssueDetailsSkeleton from "../../components/skeletons/IssueDetailsSkeleton";
import RelatedIssues from "../../components/issue/RelatedIssues";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const email = user?.email;

  /* =========================
     LOAD ISSUE
  ========================= */
  const {
    data: issue,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/issues/${id}`
      );
      return res.data;
    },
  });

  /* =========================
     UPVOTE
  ========================= */
  const upvoteMutation = useMutation({
    mutationFn: async () =>
      axios.patch(`${import.meta.env.VITE_API_BASE}/issues/upvote/${id}`, {
        email,
      }),
    onSuccess: () => {
      Swal.fire("Success", "Upvoted successfully!", "success");
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

  /* =========================
     BOOST
  ========================= */
  const handleBoost = async () => {
    if (!email) return navigate("/login");
    if (issue.priority === "high")
      return Swal.fire("Info", "Issue already boosted", "info");

    const confirm = await Swal.fire({
      title: "Boost Priority?",
      text: "Pay 100 BDT to highlight this issue",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/issues/boost`,
        { email, issueId: id }
      );

      if (res.data.url) window.location.href = res.data.url;
    } catch {
      Swal.fire("Payment Failed", "Try again later", "error");
    }
  };

  /* =========================
     DELETE (Citizen)
  ========================= */
  const handleDelete = async () => {
    const ok = await Swal.fire({
      title: "Delete Issue?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!ok.isConfirmed) return;

    await axios.delete(`${import.meta.env.VITE_API_BASE}/issues/${id}`);
    Swal.fire("Deleted", "Issue removed successfully", "success");
    navigate("/dashboard/my-issues");
  };

  /* =========================
     ADMIN REJECT
  ========================= */
  const handleReject = async () => {
    const ok = await Swal.fire({
      title: "Reject Issue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });
    if (!ok.isConfirmed) return;

    await axios.patch(`${import.meta.env.VITE_API_BASE}/issues/reject/${id}`);
    Swal.fire("Rejected", "Issue has been rejected", "success");
    refetch();
  };

  /* =========================
     STATUS UPDATE
  ========================= */
  const statusMutation = useMutation({
    mutationFn: async (status) =>
      axios.patch(`${import.meta.env.VITE_API_BASE}/issues/status/${id}`, {
        status,
        by: email,
      }),
    onSuccess: () => {
      Swal.fire("Updated", "Status updated successfully", "success");
      queryClient.invalidateQueries(["issue", id]);
    },
  });

  const allowedStatus = [
    "pending",
    "in-progress",
    "working",
    "resolved",
    "closed",
  ];

  if (isLoading) return <IssueDetailsSkeleton />;
  if (!issue) return <p className="text-center mt-20">Issue not found</p>;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div
        className={`rounded-3xl border shadow-xl p-6 md:p-8 transition ${
          dark
            ? "bg-[#111] border-purple-500/20 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-4">{issue.title}</h1>

        {/* IMAGE */}
        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
        )}

        {/* META */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="badge badge-info capitalize">
            Status: {issue.status}
          </span>
          <span className="badge badge-warning capitalize">
            Priority: {issue.priority}
          </span>
          <span className="badge badge-outline capitalize">
            {issue.category}
          </span>
          <span className="badge">📍 {issue.location}</span>
          <span className="badge badge-primary">
            👍 {issue.upvotes?.length || 0}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="opacity-80 leading-relaxed">{issue.description}</p>
        </div>

        {/* INFO GRID */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold">Reported By</h4>
            <p className="opacity-70">{issue.reporterEmail}</p>
          </div>

          <div>
            <h4 className="font-semibold">Assigned Staff</h4>
            {issue.assignedStaff ? (
              <p className="opacity-70">
                {issue.assignedStaff.name} ({issue.assignedStaff.email})
              </p>
            ) : (
              <p className="italic opacity-50">Not assigned yet</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button className="btn btn-primary btn-sm" onClick={handleUpvote}>
            👍 Upvote
          </button>

          <button className="btn btn-warning btn-sm" onClick={handleBoost}>
            🚀 Boost (100 BDT)
          </button>

          {email === issue.reporterEmail && issue.status === "pending" && (
            <button className="btn btn-error btn-sm" onClick={handleDelete}>
              Delete
            </button>
          )}

          {role === "admin" && issue.status === "pending" && (
            <button className="btn btn-error btn-sm" onClick={handleReject}>
              Reject
            </button>
          )}

          {(role === "staff" || role === "admin") && (
            <select
              className="select select-bordered select-sm"
              defaultValue=""
              onChange={(e) => statusMutation.mutate(e.target.value)}
            >
              <option disabled value="">
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
        <h2 className="text-2xl font-semibold mb-4">📌 Issue Timeline</h2>
        <div className="space-y-4 border-l-4 border-purple-500/40 pl-4">
          {issue.timeline?.length ? (
            issue.timeline
              .slice()
              .reverse()
              .map((log, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    dark
                      ? "bg-[#1a1a1a] border-purple-500/20"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p className="font-semibold capitalize">{log.status}</p>
                  <p className="text-sm opacity-80">{log.message}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {log.by} • {new Date(log.time).toLocaleString()}
                  </p>
                </div>
              ))
          ) : (
            <p className="italic opacity-60">No timeline updates yet</p>
          )}
        </div>
        {/* RELATED ISSUES */}
        <RelatedIssues category={issue.category} currentId={issue._id} />
      </div>
    </section>
  );
};

export default IssueDetails;
