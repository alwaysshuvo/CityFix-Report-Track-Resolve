import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeContext";

const AssignStaff = () => {
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  // load pending + in-progress issues and staff
  useEffect(() => {
    const load = async () => {
      try {
        const resIssues = await axios.get(`${import.meta.env.VITE_API_BASE}/issues`);
        const list = resIssues.data?.issues || [];
        const filtered = list.filter(
          (i) => i.status === "pending" || i.status === "in-progress"
        );
        setIssues(filtered);

        const resStaff = await axios.get(`${import.meta.env.VITE_API_BASE}/staff`);
        setStaffs(resStaff.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const assign = async (issueId, staff) => {
    if (!staff) {
      return Swal.fire("Select staff first!", "", "info");
    }

    const confirm = await Swal.fire({
      title: "Assign Staff?",
      text: `Assign ${staff.name} to this issue?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Assign",
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE}/issues/assign/${issueId}`,
        {
          name: staff.name,
          email: staff.email,
          staffId: staff._id,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Assigned!",
        timer: 1200,
        showConfirmButton: false,
        background: dark ? "#1a1a1a" : "#fff",
        color: dark ? "#fff" : "#000",
      });

      // Remove from UI so admin sees progress
      setIssues((prev) => prev.filter((i) => i._id !== issueId));
    } catch {
      Swal.fire("Error", "Assignment failed", "error");
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
      className={`p-4 md:p-8 min-h-screen ${
        dark ? "bg-[#0b0b0b] text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-8 ${
          dark ? "text-green-300" : "text-green-700"
        }`}
      >
        Assign Staff to Issues
      </h1>

      <div
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#2c2c2c]" : "bg-white border-gray-200"
        }`}
      >
        <table className="table w-full">
          <thead
            className={`text-sm ${
              dark ? "bg-[#1e1e1e] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Staff</th>
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
                        : "badge-info"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge capitalize ${
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
                  <select
                    className="select select-bordered w-full max-w-xs"
                    defaultValue=""
                    onChange={(e) => {
                      const idx = e.target.value;
                      setIssues((prev) =>
                        prev.map((i) =>
                          i._id === issue._id
                            ? { ...i, chosenStaff: staffs[idx] }
                            : i
                        )
                      );
                    }}
                  >
                    <option value="">Select Staff</option>
                    {staffs.map((s, i) => (
                      <option key={s._id} value={i}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => assign(issue._id, issue.chosenStaff)}
                    className={`btn btn-xs rounded-md ${
                      dark
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
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
                <td colSpan="5" className="text-center py-8 opacity-60">
                  No assignable issues 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignStaff;
