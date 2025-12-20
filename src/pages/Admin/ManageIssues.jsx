import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AssignStaffModal from "../../components/AdminDashboard/AssignStaffModal";

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/issues");
      setIssues(res.data);
    } catch {
      Swal.fire("Error", "Failed to load issues", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignStaff = async (staff) => {
    if (!selectedIssue) return;

    try {
      await axios.patch(
        `http://localhost:5000/issues/assign/${selectedIssue._id}`,
        {
          name: staff.name,
          email: staff.email,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Staff Assigned",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpenModal(false);
      setSelectedIssue(null);
      fetchIssues();
    } catch {
      Swal.fire("Error", "Assign failed", "error");
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Issues</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
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
                  <span className="badge badge-outline">
                    {issue.status}
                  </span>
                </td>

                <td>
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
                    <span className="italic text-gray-400">
                      Not Assigned
                    </span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => {
                      setSelectedIssue(issue);
                      setOpenModal(true);
                    }}
                    className="btn btn-xs btn-primary"
                    disabled={!!issue.assignedStaff}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}

            {issues.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Staff Modal */}
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
