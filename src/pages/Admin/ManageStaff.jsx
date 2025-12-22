import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeContext";

const ManageStaff = () => {
  const { dark } = useContext(ThemeContext);

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/staff`);
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.staff || [];
        setStaffs(list);
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to load staff", "error");
      } finally {
        setLoading(false);
      }
    };

    loadStaff();
  }, []);

  const toggleStatus = async (staff) => {
    const newStatus = staff.status === "active" ? "blocked" : "active";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This user will be marked as ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
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

    Swal.fire({
      icon: "success",
      title: "Updated!",
      showConfirmButton: false,
      timer: 1200,
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
    });
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
      className={`p-4 sm:p-6 md:p-8 min-h-screen transition-colors ${
        dark ? "bg-[#0b0b0b] text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-2xl sm:text-3xl font-bold mb-6 ${
          dark ? "text-purple-300" : "text-indigo-600"
        }`}
      >
        Manage Staff
      </h1>

      <div
        className={`overflow-x-auto rounded-xl shadow border w-full ${
          dark ? "bg-[#111] border-[#2c2c2c]" : "bg-white border-gray-200"
        }`}
      >
        <table
          className={`table w-full ${
            dark ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <thead
            className={`text-xs sm:text-sm uppercase ${
              dark ? "bg-[#1d1d1d] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Status</th>
              <th className="text-center px-3 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr
                key={staff._id}
                className={`text-sm sm:text-base ${
                  dark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-3 py-3 font-medium">{staff.name}</td>
                <td className="px-3 py-3 break-all">{staff.email}</td>

                <td className="px-3 py-3">
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

                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => toggleStatus(staff)}
                    className={`btn btn-xs sm:btn-sm rounded-md font-medium ${
                      staff.status === "active"
                        ? dark
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "btn-error"
                        : dark
                        ? "bg-green-600 hover:bg-green-700 text-white"
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
                <td colSpan="4" className="text-center py-10 opacity-60">
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

export default ManageStaff;
