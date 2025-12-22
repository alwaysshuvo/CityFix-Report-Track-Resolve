import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../provider/ThemeContext";

const AssignStaffModal = ({ open, onClose, onAssign }) => {
  const { dark } = useContext(ThemeContext);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    if (open) {
      axios.get(`${import.meta.env.VITE_API_BASE}/staff`).then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.staff || [];
        setStaffs(list);
      });
    }
  }, [open]);

  const handleAssign = () => {
    if (!selectedStaff) return;

    onAssign({
      name: selectedStaff.name,
      email: selectedStaff.email,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`
              rounded-xl w-full max-w-md p-6 shadow-xl border
              ${dark ? "bg-[#0F0F0F] border-[#333] text-gray-200" : "bg-white border-gray-200 text-gray-900"}
            `}
          >
            {/* Modal Title */}
            <h2
              className={`text-xl font-bold mb-4 ${
                dark ? "text-purple-300" : "text-indigo-600"
              }`}
            >
              Assign Staff
            </h2>

            {/* Dropdown */}
            <select
              className={`select select-bordered w-full ${
                dark
                  ? "bg-[#111] border-[#444] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
              onChange={(e) =>
                setSelectedStaff(e.target.value ? JSON.parse(e.target.value) : null)
              }
            >
              <option value="">Select staff</option>
              {staffs.map((staff) => (
                <option key={staff._id} value={JSON.stringify(staff)}>
                  {staff.name} ({staff.email})
                </option>
              ))}
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className={`btn ${
                  dark
                    ? "bg-gray-700 hover:bg-gray-800 text-white"
                    : "btn-ghost"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleAssign}
                disabled={!selectedStaff}
                className={`btn ${
                  dark
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "btn-primary"
                }`}
              >
                Assign
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignStaffModal;
