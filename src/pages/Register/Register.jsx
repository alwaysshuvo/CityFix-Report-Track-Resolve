import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { FiEye, FiEyeOff, FiUploadCloud } from "react-icons/fi";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { ThemeContext } from "../../provider/ThemeContext";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;
    setUploading(true);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append("image", img);

    try {
      const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
      const res = await fetch(url, { method: "POST", body: formData });
      setUploadProgress(70);
      const data = await res.json();

      if (data.success) {
        setImgURL(data.data.display_url);
        setUploadProgress(100);
        Swal.fire("Uploaded!", "Profile photo uploaded!", "success");
      }
    } catch {
      Swal.fire("Failed!", "Image upload failed", "error");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 600);
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

    if (!terms)
      return Swal.fire("Required!", "Accept Terms & Conditions", "warning");
    if (password.length < 6)
      return Swal.fire("Weak!", "Password must be 6+ chars", "error");
    if (password !== confirmPassword)
      return Swal.fire("Mismatch!", "Passwords don't match", "error");
    if (!imgURL)
      return Swal.fire("Required!", "Upload a profile image first", "warning");

    try {
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: imgURL,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Now login to continue",
        timer: 1500,
        showConfirmButton: false,
      });

      await auth.signOut(); // <-- logout user

      navigate("/login");
    } catch (err) {
      Swal.fire("Error", "Registration failed. Try again.", "error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();

      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/dashboard", { replace: true });
    } catch {
      Swal.fire("Error", "Google signup failed", "error");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 pt-32 pb-20 ${
        dark
          ? "bg-[#0B0B0B]"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      } transition-all duration-300`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-lg rounded-3xl shadow-2xl p-10 mb-10 border ${
          dark
            ? "bg-[#141414] border-[#2A2A2A] text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">
            Create an <span className="text-indigo-500">Account</span>
          </h1>
          <p className="text-sm opacity-70 mt-2">
            Join CityFix & improve your city
          </p>
        </div>

        <div className="text-center mb-8">
          <div className="relative w-28 h-28 mx-auto">
            <img
              src={imgURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              className="w-28 h-28 rounded-full border object-cover shadow-md"
            />
            <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-lg shadow flex gap-1 items-center">
              <FiUploadCloud /> Upload
              <input
                type="file"
                onChange={handleImgUpload}
                className="hidden"
              />
            </label>
          </div>

          {uploading && (
            <div className="mt-3 w-32 mx-auto bg-gray-300 dark:bg-[#333] rounded-full h-2 overflow-hidden">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="bg-green-500 h-full transition-all"
              ></div>
            </div>
          )}
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-[#1A1A1A] border-[#444] text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="font-medium mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-[#1A1A1A] border-[#444] text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="font-medium mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className={`w-full px-3 py-2 rounded-lg border pr-12 ${
                  dark
                    ? "bg-[#1A1A1A] border-[#444] text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl opacity-60"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="font-medium mb-1 block">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className={`w-full px-3 py-2 rounded-lg border pr-12 ${
                  dark
                    ? "bg-[#1A1A1A] border-[#444] text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl opacity-60"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-primary"
            />
            <span className="opacity-75">
              I agree to the{" "}
              <Link className="text-indigo-500 underline">
                Terms & Conditions
              </Link>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            disabled={uploading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-6 opacity-80 text-sm">
          Already have an account?
          <Link to="/login" className="text-indigo-500 ml-1 font-semibold">
            Login
          </Link>
        </p>

        <div className="flex items-center gap-3 my-6 opacity-50">
          <div className="flex-1 h-px bg-gray-400" />
          <span className="text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-400" />
        </div>

        <motion.button
          onClick={handleGoogleSignup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 ${
            dark
              ? "border-[#444] text-white hover:bg-[#222]"
              : "border-gray-300 hover:bg-gray-100"
          } transition`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
