import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AssignStaffModal = ({ open, onClose, onAssign }) => {
  const [selectedStaff, setSelectedStaff] = useState("");

  const staffs = [
    { id: "staff1", name: "John Doe", email: "john@cityfix.com" },
    { id: "staff2", name: "Sarah Smith", email: "sarah@cityfix.com" },
    { id: "staff3", name: "Alex Brown", email: "alex@cityfix.com" },
  ];

  const handleAssign = () => {
    if (!selectedStaff) return;
    onAssign(staffs.find((s) => s.id === selectedStaff));
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
            className="bg-base-100 rounded-xl shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-bold mb-4">Assign Staff</h2>

            <select
              className="select select-bordered w-full"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select a staff</option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.email})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="btn btn-ghost"
              >
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
