import { useState, useEffect, useContext } from "react";
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
import { ThemeContext } from "../../provider/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const { role, loading: roleLoading } = useRole();
  const { dark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser && role && !roleLoading) {
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "staff") navigate("/staff", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [role, roleLoading, navigate]);

  const getJwtToken = async (email) => {
    const res = await axios.post("${import.meta.env.VITE_API_BASE}/jwt", { email });
    localStorage.setItem("access-token", res.data.token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const res = await fetch("${import.meta.env.VITE_API_BASE}/jwt", {
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

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);

      await axios.post("${import.meta.env.VITE_API_BASE}/users", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      await getJwtToken(result.user.email);
    } catch {
      setError("Google login failed");
    }
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`
      min-h-screen flex items-center justify-center px-4
      ${
        dark
          ? "bg-[#0B0B0B]"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      }
      transition-all duration-300
    `}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          w-full max-w-md rounded-2xl p-8 shadow-2xl border
          ${
            dark
              ? "bg-[#141414] border-[#2A2A2A]"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>
            Welcome Back 👋
          </h1>
          <p className={`mt-2 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Login to <span className="text-indigo-600">CityFix</span> and start reporting
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className={`
                mt-1 w-full border rounded-lg px-3 py-2
                ${
                  dark
                    ? "bg-[#1A1A1A] border-[#444] text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-black placeholder-gray-500"
                }
              `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className={`
                  mt-1 w-full border rounded-lg px-3 py-2 pr-14
                  ${
                    dark
                      ? "bg-[#1A1A1A] border-[#444] text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-black placeholder-gray-500"
                  }
                `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2 text-xs
                  ${dark ? "text-gray-400" : "text-gray-600"}
                `}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Submit */}
          <button
            disabled={loading}
            className="
              w-full py-3 rounded-xl text-white font-semibold
              bg-indigo-600 hover:bg-indigo-700 transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className={`flex-1 h-px ${dark ? "bg-[#333]" : "bg-gray-200"}`} />
          <span className="text-xs text-gray-400">OR</span>
          <div className={`flex-1 h-px ${dark ? "bg-[#333]" : "bg-gray-200"}`} />
        </div>

        <button
          onClick={handleGoogleLogin}
          className={`
            w-full py-3 border rounded-xl flex items-center justify-center gap-2
            ${
              dark
                ? "text-white border-[#444] hover:bg-[#222]"
                : "border-gray-300 hover:bg-gray-100 text-black"
            }
            transition
          `}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        <p className={`text-center text-sm mt-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
          No account?{" "}
          <Link className="text-indigo-600 font-semibold" to="/register">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
