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

  /* =====================
      Load Issues
  ======================*/
  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get("${import.meta.env.VITE_API_BASE}/issues");
      setIssues(res.data.issues || []); // 🔥 main fix
    } catch (err) {
      Swal.fire("Error", "Failed to load issues", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  /* =====================
      Assign Staff
  ======================*/
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
    <div className={`transition-all ${dark ? "text-gray-200" : "text-gray-900"}`}>
      <h1
        className={`text-3xl font-bold mb-6 ${
          dark ? "text-purple-300" : "text-indigo-600"
        }`}
      >
        Manage Issues
      </h1>

      <div
        className={`
          overflow-x-auto rounded-xl shadow border
          ${dark ? "bg-[#111] border-[#2c2c2c]" : "bg-white border-gray-200"}
        `}
      >
        <table
          className={`table ${
            dark ? "text-gray-200 [&_tr:hover]:!bg-[#1a1a1a]" : "text-gray-800"
          }`}
        >
          <thead
            className={`text-sm uppercase ${
              dark ? "bg-[#1b1b1b] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th>Action</th>
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
                        : "badge-success"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge capitalize ${
                      issue.priority === "high" ? "badge-error" : "badge-outline"
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

                <td>
                  <button
                    onClick={() => {
                      setSelectedIssue(issue);
                      setOpenModal(true);
                    }}
                    disabled={!!issue.assignedStaff}
                    className={`btn btn-xs ${
                      issue.assignedStaff
                        ? "btn-disabled"
                        : dark
                        ? "bg-purple-600 text-white hover:bg-purple-700"
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
                <td colSpan="5" className="py-6 text-center opacity-70">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIssue && (
        <AssignStaffModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedIssue(null);
          }}
          onAssign={handleAssignStaff}
        />
      )}
    </div>
  );
};

export default ManageIssues;
