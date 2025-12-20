import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import useRole from "../../hooks/useRole";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useRole();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     🔁 ROLE BASED REDIRECT
  ========================== */
  useEffect(() => {
    if (auth.currentUser && role && !roleLoading) {
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "staff") navigate("/staff", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [role, roleLoading, navigate]);

  /* =========================
     🔐 GET JWT TOKEN
  ========================== */
  const getJwtToken = async (email) => {
    const res = await axios.post("http://localhost:5000/jwt", { email });
    localStorage.setItem("access-token", res.data.token);
  };

  /* =========================
     EMAIL LOGIN
  ========================== */
  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    // 🔐 get JWT
    const res = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: result.user.email }),
    });

    const data = await res.json();
    localStorage.setItem("access-token", data.token);
  } catch {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  /* =========================
     GOOGLE LOGIN
  ========================== */
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);

      // Save user in DB (role assign হয় এখানে)
      await axios.post("http://localhost:5000/users", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      // 🔐 get JWT
      await getJwtToken(result.user.email);
    } catch {
      setError("Google login failed");
    }
  };

  /* =========================
     LOADING (ROLE FETCH)
  ========================== */
  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#ec4899] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Login to <span className="text-indigo-600">CityFix</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Report issues and track city improvements
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 input input-bordered w-full pr-14"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
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

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE */}
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

        {/* REGISTER */}
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
