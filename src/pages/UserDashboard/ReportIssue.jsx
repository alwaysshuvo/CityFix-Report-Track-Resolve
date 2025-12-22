import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useState } from "react";
import { ThemeContext } from "../../provider/ThemeContext";
import { AuthContext } from "../../provider/AuthProvider";

const ReportIssue = () => {
  const { dark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleImageUpload = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageLoading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      const url = res.data.data.url;
      setUploadedImage(url);
      Swal.fire("Uploaded!", "Image uploaded successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newIssue = {
      title: form.title.value,
      category: form.category.value.toLowerCase(),
      priority: form.priority.value.toLowerCase(),
      location: form.location.value,
      description: form.description.value,
      reporterEmail: user?.email,
      image: uploadedImage || "",
    };

    try {
      setLoading(true);
      const res = await axios.post("${import.meta.env.VITE_API_BASE}/issues", newIssue);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Issue Submitted!",
          text: "Your issue has been reported successfully.",
          confirmButtonColor: "#6366f1",
        });
        form.reset();
        setUploadedImage("");
      }
    } catch {
      Swal.fire("Error", "Backend did not accept your data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    input w-full mt-2 transition
    ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}
  `;

  const selectClass = `
    select w-full mt-2 transition
    ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}
  `;

  const textareaClass = `
    textarea w-full mt-2 transition
    ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}
  `;

  const fileClass = `
    file-input w-full mt-2 transition
    ${dark ? "bg-[#111] border-[#333] text-white" : "bg-white border-gray-300 text-gray-900"}
  `;

  return (
    <div
      className={`p-6 min-h-screen max-w-5xl mx-auto transition-all duration-300
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

        <form
          onSubmit={handleSubmit}
          className={`shadow-xl rounded-xl p-8 space-y-6 transition
          ${dark ? "bg-[#161616] border border-[#2b2b2b]" : "bg-white border border-gray-200"}`}
        >
          {/* TITLE */}
          <div>
            <label className="font-medium">Issue Title</label>
            <input
              name="title"
              type="text"
              required
              className={inputClass}
              placeholder="e.g. Broken Streetlight"
            />
          </div>

          {/* CATEGORY / PRIORITY / LOCATION */}
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="font-medium">Category</label>
              <select name="category" required className={selectClass}>
                <option value="">Select category</option>
                <option value="road">Road</option>
                <option value="water">Water</option>
                <option value="electrical">Electrical</option>
                <option value="garbage">Garbage</option>
                <option value="environment">Environment</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Priority</label>
              <select name="priority" required className={selectClass}>
                <option value="">Select priority</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Location</label>
              <input
                name="location"
                type="text"
                required
                className={inputClass}
                placeholder="e.g. Uttara, Dhaka"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              className={textareaClass}
              placeholder="Describe the issue clearly..."
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className={fileClass}
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />

            {imageLoading && (
              <p className="text-xs mt-1 text-yellow-400">Uploading...</p>
            )}

            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="uploaded"
                className="w-40 mt-3 rounded-xl shadow border"
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="btn btn-primary w-full text-lg"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportIssue;
