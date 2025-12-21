import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";

const ReportIssue = () => {
  const { dark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const issue = {
      title: form.title.value,
      category: form.category.value,
      priority: form.priority.value,
      location: form.location.value,
      description: form.description.value,
      reporterEmail: user?.email,
    };

    try {
      const res = await axios.post("http://localhost:5000/issues", issue);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Issue Submitted!",
          text: "Your issue has been reported successfully.",
          confirmButtonColor: "#6366f1",
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Backend did not accept your data.",
      });
    }
  };

  return (
    <div
      className={`p-6 max-w-5xl mx-auto transition-all duration-300
      ${dark ? "text-white bg-[#0d0d0d]" : "text-gray-900 bg-gray-100"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <p className={`${dark ? "text-gray-400" : "text-gray-500"} mb-8`}>
          Help improve your city by reporting public infrastructure issues.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className={`shadow-xl rounded-xl p-8 space-y-6 transition
          ${dark ? "bg-[#161616] border border-[#2b2b2b]" : "bg-white border border-gray-200"}`}
        >
          <div>
            <label className="font-medium">Issue Title</label>
            <input
              name="title"
              type="text"
              required
              className={`input w-full mt-2 transition
              ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
              placeholder="e.g. Broken Streetlight"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="font-medium">Category</label>
              <select
                name="category"
                className={`select w-full mt-2 transition
                ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
                required
              >
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
              <select
                name="priority"
                className={`select w-full mt-2 transition
                ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
                required
              >
                <option value="">Select priority</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Location</label>
              <input
                name="location"
                type="text"
                required
                className={`input w-full mt-2 transition
                ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
                placeholder="e.g. Uttara, Dhaka"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              className={`textarea w-full mt-2 transition
              ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
              placeholder="Describe the issue clearly..."
            />
          </div>

          {/* Image store later (Cloudinary, ImgBB) */}
          <div>
            <label className="font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className={`file-input w-full mt-2 transition
              ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}`}
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
