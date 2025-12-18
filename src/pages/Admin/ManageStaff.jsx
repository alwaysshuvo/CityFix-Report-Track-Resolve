import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageStaff = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/staff").then((res) => {
      setStaffs(res.data);
    });
  }, []);

  const toggleStatus = async (staff) => {
    const newStatus = staff.status === "active" ? "blocked" : "active";

    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `This staff will be ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    await axios.patch(
      `http://localhost:5000/staff/status/${staff._id}`,
      { status: newStatus }
    );

    setStaffs((prev) =>
      prev.map((s) =>
        s._id === staff._id ? { ...s, status: newStatus } : s
      )
    );

    Swal.fire({
      icon: "success",
      title: "Updated",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Staff</h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td className="font-medium">{staff.name}</td>
                <td>{staff.email}</td>

                <td>
                  <span
                    className={`badge ${
                      staff.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => toggleStatus(staff)}
                    className={`btn btn-xs ${
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
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No staff found
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
