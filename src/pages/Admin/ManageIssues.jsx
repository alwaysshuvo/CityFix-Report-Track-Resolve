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
    <div
      className={`
        transition-colors duration-300
        ${dark ? "text-gray-200" : "text-gray-900"}
      `}
    >
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
          transition-colors duration-300
          ${
            dark
              ? "bg-[#111] border-[#2c2c2c]"
              : "bg-white border-gray-200"
          }
        `}
      >
        <table
          className={`table ${
            dark
              ? "text-gray-200 [&_tr:hover]:!bg-[#1a1a1a]"
              : "text-gray-800"
          }`}
        >
          <thead
            className={`
              text-sm uppercase
              ${
                dark
                  ? "bg-[#1b1b1b] text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }
            `}
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
              <tr
                key={issue._id}
                className={`${dark ? "hover:bg-[#1a1a1a]" : ""}`}
              >
                <td className="font-medium">{issue.title}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`badge badge-outline ${
                      dark ? "border-gray-500 text-gray-300" : ""
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>

                {/* PRIORITY */}
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

                {/* STAFF */}
                <td>
                  {issue.assignedStaff ? (
                    <div>
                      <p className="font-medium">
                        {issue.assignedStaff.name}
                      </p>
                      <p
                        className={`text-xs ${
                          dark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {issue.assignedStaff.email}
                      </p>
                    </div>
                  ) : (
                    <span
                      className={`italic ${
                        dark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Not Assigned
                    </span>
                  )}
                </td>

                {/* ACTION BUTTON */}
                <td>
                  <button
                    onClick={() => {
                      setSelectedIssue(issue);
                      setOpenModal(true);
                    }}
                    className={`
                      btn btn-xs 
                      ${
                        issue.assignedStaff
                          ? "btn-disabled"
                          : dark
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "btn-primary"
                      }
                    `}
                    disabled={!!issue.assignedStaff}
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
                  className="text-center py-6 text-gray-500"
                >
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
