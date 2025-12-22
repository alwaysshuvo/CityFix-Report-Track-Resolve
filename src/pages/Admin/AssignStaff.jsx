import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeContext";

const AssignStaff = () => {
  const { dark } = useContext(ThemeContext);

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/staff`);
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.staff || [];
        setStaffs(list);
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to load staff list", "error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleStatus = async (staff) => {
    const newStatus = staff.status === "active" ? "blocked" : "active";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This staff will be ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return;

    await axios.patch(
      `${import.meta.env.VITE_API_BASE}/staff/status/${staff._id}`,
      { status: newStatus }
    );

    setStaffs((prev) =>
      prev.map((s) =>
        s._id === staff._id ? { ...s, status: newStatus } : s
      )
    );

    Swal.fire("Updated!", "", "success");
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
      className={`p-4 md:p-8 transition-all ${
        dark ? "bg-[#0b0b0b] text-white" : "bg-white"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          dark ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Manage Staff
      </h1>

      <div
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
        }`}
      >
        <table className="table w-full">
          <thead
            className={`text-sm ${
              dark ? "bg-[#1d1d1d] text-gray-300" : "bg-gray-100"
            }`}
          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td className="font-medium">{staff.name}</td>
                <td>{staff.email}</td>

                <td>
                  <span
                    className={`badge capitalize ${
                      staff.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => toggleStatus(staff)}
                    className={`btn btn-xs rounded-md ${
                      staff.status === "active"
                        ? "btn-error"
                        : "btn-success"
                    }`}
                  >
                    {staff.status === "active" ? "Block" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {staffs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 opacity-60">
                  No staff found.
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
