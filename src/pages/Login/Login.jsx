import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError("");

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#ec4899] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Login to <span className="text-indigo-600">CityFix</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Report issues and track city improvements
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            disabled={loading}
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
