import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosSecure from "../../hooks/useAxiosSecure";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const [editIssue, setEditIssue] = useState(null);

  // New Filters
  const [page, setPage] = useState(1);
  const limit = 5;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Query
  const { data, isLoading } = useQuery({
    queryKey: ["my-issues", user?.email, page, search, status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/user/${user.email}?page=${page}&limit=${limit}&search=${search}&status=${status}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const issues = data?.issues || [];
  const totalPages = data?.totalPages || 1;

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/issues/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Issue removed.", "success");
      queryClient.invalidateQueries(["my-issues"]);
    },
  });

  const handleDelete = async (id, status) => {
    if (status !== "pending") {
      return Swal.fire("Denied", "Only pending issues can be deleted.", "info");
    }
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "Remove this issue permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (confirm.isConfirmed) deleteMutation.mutate(id);
  };

  // Update
  const updateMutation = useMutation({
    mutationFn: async (issue) => await axiosSecure.put(`/issues/${issue._id}`, issue),
    onSuccess: () => {
      Swal.fire("Updated!", "Issue updated.", "success");
      setEditIssue(null);
      queryClient.invalidateQueries(["my-issues"]);
    },
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    updateMutation.mutate({
      _id: editIssue._id,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      image: form.image.value,
      reporterEmail: user.email,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 min-h-screen ${dark ? "bg-[#0d0d0d] text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">My Reported Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          className="input input-bordered w-1/2"
          placeholder="Search by title, category, location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-xl shadow border ${dark ? "bg-[#161616] border-[#2c2c2c]" : "bg-white border-gray-200"}`}>
        <table className="table">
          <thead className={`${dark ? "bg-[#222]" : "bg-base-200"} text-sm`}>
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
                <td className="font-semibold">{issue.title}</td>
                <td>
                  <span className={`badge capitalize ${
                    issue.status === "pending" ? "badge-warning" :
                    issue.status === "in-progress" ? "badge-info" :
                    issue.status === "resolved" ? "badge-success" :
                    issue.status === "rejected" ? "badge-error" : "badge-neutral"
                  }`}>
                    {issue.status}
                  </span>
                </td>
                <td>
                  <span className={`badge capitalize ${
                    issue.priority === "high" ? "badge-error" :
                    issue.priority === "medium" ? "badge-warning" :
                    "badge-info"
                  }`}>
                    {issue.priority}
                  </span>
                </td>
                <td>
                  {issue.assignedStaff ? (
                    <div>
                      <p className="font-medium">{issue.assignedStaff.name}</p>
                      <p className="text-xs opacity-60">{issue.assignedStaff.email}</p>
                    </div>
                  ) : <span className="opacity-60 italic">None</span>}
                </td>
                <td className="flex gap-2 mt-2">
                  <Link to={`/issue/${issue._id}`} className="btn btn-xs btn-info">Details</Link>

                  {issue.status === "pending" && (
                    <button onClick={() => setEditIssue(issue)} className="btn btn-xs btn-warning">Edit</button>
                  )}

                  <button onClick={() => handleDelete(issue._id, issue.status)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 opacity-70">
                  No issues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <p className="text-sm opacity-70">Page {page} of {totalPages}</p>

        <button
          className="btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editIssue && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Issue</h3>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input className="input input-bordered w-full" name="title" defaultValue={editIssue.title} required />

              <textarea className="textarea textarea-bordered w-full" name="description" rows="3" defaultValue={editIssue.description} required />

              <input className="input input-bordered w-full" name="category" defaultValue={editIssue.category} required />

              <input className="input input-bordered w-full" name="location" defaultValue={editIssue.location} required />

              <input className="input input-bordered w-full" name="image" defaultValue={editIssue.image} />

              <button className="btn btn-primary w-full mt-3">Save</button>
            </form>

            <div className="modal-action">
              <button onClick={() => setEditIssue(null)} className="btn btn-outline">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyIssues;
