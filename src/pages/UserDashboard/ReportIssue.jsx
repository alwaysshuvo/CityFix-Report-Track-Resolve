import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ReportIssue = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Issue Submitted!",
      text: "Your issue has been reported successfully.",
      confirmButtonColor: "#6366f1",
    });

    e.target.reset();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <p className="text-gray-500 mb-8">
          Help improve your city by reporting public infrastructure issues.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="font-medium">Issue Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Broken Streetlight"
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="font-medium">Category</label>
              <select className="select select-bordered w-full mt-2" required>
                <option value="">Select category</option>
                <option>Road</option>
                <option>Water</option>
                <option>Electrical</option>
                <option>Garbage</option>
                <option>Environment</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Priority</label>
              <select className="select select-bordered w-full mt-2" required>
                <option value="">Select priority</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Location</label>
              <input
                type="text"
                required
                placeholder="e.g. Uttara, Dhaka"
                className="input input-bordered w-full mt-2"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              required
              rows="4"
              placeholder="Describe the issue clearly..."
              className="textarea textarea-bordered w-full mt-2"
            />
          </div>

          <div>
            <label className="font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full mt-2"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-full text-lg"
          >
            Submit Issue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportIssue;
