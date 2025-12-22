import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AssignStaffModal from "../../components/AdminDashboard/AssignStaffModal";
import { ThemeContext } from "../../provider/ThemeContext";

const ManageIssues = () => {
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_BASE}/issues?page=1&limit=50`;
      const res = await axios.get(url);

      setIssues(Array.isArray(res.data.issues) ? res.data.issues : []);
    } catch (err) {
      Swal.fire("Error", "Failed to load issues", "error");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleAssignStaff = async (staff) => {
    if (!selectedIssue) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE}/issues/assign/${selectedIssue._id}`,
        staff
      );

      Swal.fire({
        icon: "success",
        title: "Staff Assigned Successfully",
        timer: 1500,
        showConfirmButton: false,
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#000",
      });

      setOpenModal(false);
      setSelectedIssue(null);
      fetchIssues();
    } catch {
      Swal.fire("Error", "Failed to assign staff", "error");
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
      className={`min-h-screen p-4 md:p-8 transition-all duration-300 ${
        dark ? "bg-[#0B0B0B] text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-8 ${
          dark ? "text-purple-300" : "text-indigo-600"
        }`}
      >
        Manage Issues
      </h1>

      {/* TABLE */}
      <div
        className={`
          overflow-x-auto rounded-xl shadow border transition-colors
          ${dark ? "bg-[#111] border-[#2c2c2c]" : "bg-white border-gray-200"}
        `}
      >
        <table
          className={`table w-full ${
            dark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          <thead
            className={`text-xs uppercase ${
              dark
                ? "bg-[#1d1d1d] text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody
            className={`text-sm ${
              dark
                ? "[&_tr:hover]:!bg-[#1a1a1a] divide-y divide-[#2c2c2c]"
                : "divide-y divide-gray-200 [&_tr:hover]:!bg-gray-50"
            }`}
          >
            {issues.map((issue) => (
              <tr key={issue._id} className="transition">
                <td className="font-medium">{issue.title}</td>

                <td>
                  <span
                    className={`badge badge-sm capitalize ${
                      issue.status === "pending"
                        ? "badge-warning"
                        : issue.status === "in-progress"
                        ? "badge-info"
                        : issue.status === "rejected"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge badge-sm capitalize ${
                      issue.priority === "high"
                        ? "badge-error"
                        : issue.priority === "medium"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>

                <td>
                  {issue.assignedStaff ? (
                    <div className="leading-tight">
                      <p className="font-medium">{issue.assignedStaff.name}</p>
                      <p className="text-xs opacity-60">{issue.assignedStaff.email}</p>
                    </div>
                  ) : (
                    <span className="text-xs italic opacity-60">Not Assigned</span>
                  )}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => {
                      setSelectedIssue(issue);
                      setOpenModal(true);
                    }}
                    disabled={!!issue.assignedStaff}
                    className={`btn btn-xs rounded-md font-medium ${
                      issue.assignedStaff
                        ? "btn-disabled"
                        : dark
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "btn-primary"
                    }`}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 opacity-60 italic"
                >
                  No issues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedIssue && (
        <AssignStaffModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedIssue(null);
          }}
          onAssign={handleAssignStaff}
          dark={dark}
        />
      )}
    </div>
  );
};

export default ManageIssues;
