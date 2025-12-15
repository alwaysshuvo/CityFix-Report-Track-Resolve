import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const termsAccepted = form.terms.checked;

    if (!termsAccepted) {
      return Swal.fire("Oops!", "You must accept Terms & Conditions", "warning");
    }

    if (password.length < 6) {
      return Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters",
        "error"
      );
    }

    if (password !== confirmPassword) {
      return Swal.fire("Mismatch!", "Passwords do not match", "error");
    }

    try {
      await createUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to CityFix 🎉",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Signed up with Google",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">
            Create an <span className="text-primary">Account</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Join CityFix and help improve your city
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create a password"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              className="input input-bordered w-full"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-sm mt-1"
            />
            <span className="text-gray-600">
              I agree to the{" "}
              <Link to="#" className="text-primary font-medium hover:underline">
                Terms & Conditions
              </Link>
            </span>
          </label>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn btn-primary w-full text-lg"
          >
            Register
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <motion.button
          onClick={handleGoogleSignup}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn btn-outline w-full mt-5"
        >
          Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
