import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AssignStaffModal = ({ open, onClose, onAssign }) => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    if (open) {
      axios.get(`${import.meta.env.VITE_API_BASE}/staff`).then((res) => {
        setStaffs(res.data);
      });
    }
  }, [open]);

  const handleAssign = () => {
    if (!selectedStaff) return;

    // send only necessary
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
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-base-100 rounded-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-bold mb-4">Assign Staff</h2>

            <select
              className="select select-bordered w-full"
              onChange={(e) =>
                setSelectedStaff(
                  staffs.find((s) => s._id === e.target.value)
                )
              }
            >
              <option value="">Select staff</option>
              {staffs.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} ({staff.email})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="btn btn-primary"
                disabled={!selectedStaff}
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
