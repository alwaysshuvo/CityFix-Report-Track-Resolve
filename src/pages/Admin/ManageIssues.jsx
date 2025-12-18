import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AssignStaffModal from "../../components/AdminDashboard/AssignStaffModal";

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Fetch issues
  useEffect(() => {
    axios.get("http://localhost:5000/issues").then((res) => {
      setIssues(res.data);
    });
  }, []);

  // Open modal for specific issue
  const handleOpenModal = (issue) => {
    setSelectedIssue(issue);
    setOpenModal(true);
  };

  // Assign staff handler
  const handleAssignStaff = async (staff) => {
    try {
      await axios.patch(
        `http://localhost:5000/issues/assign/${selectedIssue._id}`,
        {
          assignedStaff: staff,
        }
      );

      // Update UI instantly
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === selectedIssue._id
            ? { ...issue, assignedStaff: staff }
            : issue
        )
      );

      setOpenModal(false);
      setSelectedIssue(null);

      Swal.fire({
        icon: "success",
        title: "Staff Assigned Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to assign staff", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Issues</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>

                <td className="font-medium">{issue.title}</td>
                <td>{issue.category}</td>

                <td>
                  <span className="badge badge-warning capitalize">
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : "badge-outline"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>

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
                    <span className="text-gray-400 italic">
                      Not Assigned
                    </span>
                  )}
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(issue)}
                    className="btn btn-xs btn-primary"
                    disabled={!!issue.assignedStaff}
                  >
                    Assign Staff
                  </button>

                  <button className="btn btn-xs btn-error btn-outline">
                    Reject
                  </button>

                  <button className="btn btn-xs btn-ghost">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignStaffModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAssign={handleAssignStaff}
      />
    </div>
  );
};

export default ManageIssues;
