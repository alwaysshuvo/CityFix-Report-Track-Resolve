import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "../../provider/ThemeContext";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const { dark } = useContext(ThemeContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/admin/users`);

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.users || [];

      setUsers(list);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE}/admin/users/role/${id}`,
      { role }
    );
    fetchUsers();
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === "blocked" ? "active" : "blocked";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This user will be ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;

    await axios.patch(
      `${import.meta.env.VITE_API_BASE}/admin/users/status/${user._id}`,
      { status: newStatus }
    );

    Swal.fire({
      icon: "success",
      title: "Updated",
      timer: 1200,
      showConfirmButton: false,
      background: dark ? "#1a1a1a" : "#fff",
      color: dark ? "#fff" : "#000",
    });

    fetchUsers();
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
      className={`p-4 sm:p-6 md:p-10 transition-all min-h-screen ${
        dark ? "bg-[#0b0b0b] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold ${
            dark ? "text-blue-300" : "text-indigo-600"
          }`}
        >
          Manage Users
        </h1>
        <p
          className={`text-sm sm:text-base px-4 py-1 rounded-full border ${
            dark ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
          }`}
        >
          Total Users: <span className="font-semibold">{users.length}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`overflow-x-auto rounded-xl shadow border ${
          dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"
        }`}
      >
        <table
          className={`table w-full text-sm sm:text-base ${
            dark ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <thead
            className={`text-xs sm:text-sm uppercase tracking-wide ${
              dark ? "bg-[#1a1a1a] text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`${dark ? "hover:bg-[#1b1b1b]" : "hover:bg-gray-50"}`}
              >
                <td className="px-3 py-3 font-medium whitespace-nowrap">
                  {user.name || "N/A"}
                </td>
                <td className="px-3 py-3 break-all">{user.email}</td>

                <td className="px-3 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                    className={`select select-xs sm:select-sm rounded-md ${
                      dark
                        ? "bg-[#222] border-[#444] text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="citizen">Citizen</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`badge capitalize ${
                      user.status === "blocked"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => toggleStatus(user)}
                    className={`btn btn-xs sm:btn-sm rounded-md font-semibold ${
                      user.status === "blocked"
                        ? dark
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "btn-success"
                        : dark
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "btn-error"
                    }`}
                  >
                    {user.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="py-10 text-center opacity-60">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
