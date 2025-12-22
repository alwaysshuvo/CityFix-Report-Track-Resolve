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

  /* ===========================
       IMAGE UPLOAD
  ============================ */
  const handleImageUpload = async (file) => {
    console.log("Uploading Image:", file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    console.log("IMGBB KEY:", apiKey);

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
      console.log("Uploaded Image URL:", url);

      Swal.fire({
        title: "Image Uploaded",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log("Image Upload Error:", err);
      Swal.fire("Upload Failed", "Could not upload image.", "error");
    } finally {
      setImageLoading(false);
    }
  };

  /* ===========================
       SUBMIT ISSUE
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED!");

    if (!user?.email) {
      console.log("No User Email Found!");
      Swal.fire("Login Required", "You must login first!", "warning");
      return;
    }

    const form = e.target;
    const newIssue = {
      title: form.title.value,
      category: form.category.value.toLowerCase(),
      priority: form.priority.value.toLowerCase(),
      location: form.location.value,
      description: form.description.value,
      reporterEmail: user.email,
      image: uploadedImage,
    };

    console.log("Issue Payload:", newIssue);
    console.log(
      "Backend URL:",
      `${import.meta.env.VITE_API_BASE}/issues`
    );

    const confirm = await Swal.fire({
      title: "Submit Issue?",
      text: "Send this issue to city admins?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, Submit",
    });

    if (!confirm.isConfirmed) {
      console.log("User cancelled submit.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/issues`,
        newIssue
      );

      console.log("Backend Response:", res.data);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Issue Submitted!",
          text: "Admin will assign staff and track progress.",
          confirmButtonColor: "#4f46e5",
        });

        form.reset();
        setUploadedImage("");
      }
    } catch (err) {
      console.log("Submit Error:", err);
      Swal.fire("Error", "Backend didn't accept data.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* INPUT STYLES */
  const inputClass = `input w-full mt-2 ${
    dark
      ? "bg-[#111] border-[#333] text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;
  const selectClass = `select w-full mt-2 ${
    dark
      ? "bg-[#111] border-[#333] text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;
  const textareaClass = `textarea w-full mt-2 ${
    dark
      ? "bg-[#111] border-[#333] text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;
  const fileClass = `file-input w-full mt-2 ${
    dark
      ? "bg-[#111] border-[#333] text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  return (
    <div
      className={`p-6 min-h-screen max-w-5xl mx-auto ${
        dark ? "text-white bg-[#0d0d0d]" : "text-gray-900 bg-gray-100"
      }`}
    >
      <motion.div>
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <form
          onSubmit={handleSubmit}
          className={`shadow-xl rounded-xl p-8 space-y-6 ${
            dark
              ? "bg-[#161616] border border-[#2b2b2b]"
              : "bg-white border border-gray-200"
          }`}
        >
          <div>
            <label>Issue Title</label>
            <input
              type="text"
              name="title"
              required
              className={inputClass}
              placeholder="Broken Streetlight..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label>Category</label>
              <select name="category" required className={selectClass}>
                <option value="">Select</option>
                <option value="road">Road</option>
                <option value="water">Water</option>
                <option value="electrical">Electrical</option>
                <option value="garbage">Garbage</option>
                <option value="environment">Environment</option>
              </select>
            </div>

            <div>
              <label>Priority</label>
              <select name="priority" required className={selectClass}>
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                required
                className={inputClass}
                placeholder="Uttara, Dhaka"
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              required
              className={textareaClass}
            />
          </div>

          <div>
            <label>Upload Image</label>
            <input
              type="file"
              className={fileClass}
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            {imageLoading && <p>Uploading...</p>}
            {uploadedImage && <img src={uploadedImage} className="w-40 mt-3" />}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
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
