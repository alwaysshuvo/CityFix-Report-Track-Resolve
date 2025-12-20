import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", img);

    try {
      const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setImgURL(data.data.display_url);
        Swal.fire("Uploaded!", "Profile image uploaded!", "success");
      }
    } catch {
      Swal.fire("Failed!", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const terms = form.terms.checked;

    if (!terms) {
      return Swal.fire("Required!", "Accept Terms & Conditions", "warning");
    }
    if (password.length < 6) {
      return Swal.fire("Weak!", "Password must be 6+ chars", "error");
    }
    if (password !== confirmPassword) {
      return Swal.fire("Error!", "Passwords don't match", "error");
    }
    if (!imgURL) {
      return Swal.fire("Required!", "Upload your profile image", "warning");
    }

    try {
      const userCredential = await createUser(email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: imgURL,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome to CityFix, ${name}! 🎉`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Signed in with Google",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div
      className="
      min-h-screen flex items-center justify-center 
      px-4 pt-32 pb-20
      bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 mb-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create an <span className="text-blue-600">Account</span>
          </h1>
          <p className="text-gray-500 mt-2">Join CityFix & improve your city</p>
        </div>

        {/* Profile Upload */}
        <div className="text-center mb-8">
          {imgURL ? (
            <img
              src={imgURL}
              className="w-24 h-24 rounded-full mx-auto object-cover border shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}

          <label className="block mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 
            text-white px-4 py-2 rounded-lg text-sm">
            {uploading ? "Uploading..." : "Upload Profile Image"}
            <input type="file" onChange={handleImgUpload} className="hidden" />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" name="name" required className="input input-bordered w-full" />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" required className="input input-bordered w-full" />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="form-control">
            <label className="cursor-pointer flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-primary"
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link to="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            disabled={uploading}
            className="btn btn-primary w-full text-lg"
          >
            {uploading ? "Wait..." : "Register"}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Google */}
        <motion.button
          onClick={handleGoogleSignup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline w-full mt-6"
        >
          Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
