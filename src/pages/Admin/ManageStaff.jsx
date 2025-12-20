import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeContext";

const ManageStaff = () => {
  const { dark } = useContext(ThemeContext);
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
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
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
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
    });
  };

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
        Manage Staff
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
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff) => (
              <tr
                key={staff._id}
                className={`${dark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-50"}`}
              >
                <td className="font-medium">{staff.name}</td>
                <td>{staff.email}</td>

                <td>
                  <span
                    className={`
                      badge capitalize
                      ${
                        staff.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }
                    `}
                  >
                    {staff.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => toggleStatus(staff)}
                    className={`
                      btn btn-xs
                      ${
                        staff.status === "active"
                          ? dark
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "btn-error"
                          : dark
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "btn-success"
                      }
                    `}
                  >
                    {staff.status === "active" ? "Block" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {staffs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className={`text-center py-6 ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
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
