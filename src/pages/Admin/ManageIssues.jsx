import { useState } from "react";
import AssignStaffModal from "../../components/AdminDashboard/AssignStaffModal";

const ManageIssues = () => {
  const [openModal, setOpenModal] = useState(false);
  const [assignedStaff, setAssignedStaff] = useState(null);

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
            <tr>
              <td>1</td>
              <td className="font-medium">Broken Road</td>
              <td>Road</td>

              <td>
                <span className="badge badge-warning">Pending</span>
              </td>

              <td>
                <span className="badge badge-error">High</span>
              </td>

              <td>
                {assignedStaff ? (
                  <div>
                    <p className="font-medium">{assignedStaff.name}</p>
                    <p className="text-xs text-gray-500">
                      {assignedStaff.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Not Assigned</span>
                )}
              </td>

              <td className="flex gap-2">
                <button
                  onClick={() => setOpenModal(true)}
                  className="btn btn-xs btn-primary"
                  disabled={!!assignedStaff}
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
          </tbody>
        </table>
      </div>

      <AssignStaffModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAssign={(staff) => setAssignedStaff(staff)}
      />
    </div>
  );
};

export default ManageIssues;
