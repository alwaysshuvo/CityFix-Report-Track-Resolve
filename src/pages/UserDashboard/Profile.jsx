import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCrown, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const [payments, setPayments] = useState([]);

  const loadUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/users/${user?.email}`
      );
      setDbUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadPayments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/payments/user/${user?.email}`
      );
      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadUser();
      loadPayments();
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("refreshProfile") === "true") {
      loadUser();
      loadPayments();
      localStorage.removeItem("refreshProfile");
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (dbUser?.premium) {
      Swal.fire("Already Premium", "Enjoy unlimited access! 😎", "info");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/create-checkout-session`,
        { email: user?.email }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Invalid payment URL");
      }
    } catch (err) {
      Swal.fire("Payment Error", err.message, "error");
    }
  };

  if (!dbUser) {
    return (
      <div className="flex justify-center mt-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isPremium = dbUser?.premium;
  const isBlocked = dbUser?.status === "blocked";
  const lastPayment = payments[0];

  return (
    <div
      className={`min-h-screen pt-28 pb-20 px-4 transition-all duration-300 ${
        dark ? "bg-[#0a0a0a] text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-5xl mx-auto rounded-2xl shadow-xl p-10 ${
          dark ? "bg-[#151515] border border-[#2d2d2d]" : "bg-white border"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-10">
          My <span className="text-primary">Profile</span>
        </h1>

        {isBlocked && (
          <div className="alert alert-error mb-6">
            ❌ Your account is blocked! Contact support.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Card */}
          <div className="flex flex-col items-center text-center relative">
            {/* Premium Crown */}
            {isPremium && (
              <div className="absolute -top-4 right-3 text-yellow-400 text-3xl drop-shadow">
                <FaCrown />
              </div>
            )}

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={
                photo ||
                user?.photoURL ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-xl border-4 border-primary"
            />

            <h2 className="text-2xl font-bold mt-4">{name}</h2>
            <p className="mt-1 opacity-80">{user?.email}</p>

            <div className="mt-2">
              {isPremium ? (
                <span className="px-4 py-1 rounded-full bg-yellow-500 text-black font-semibold flex items-center gap-2 justify-center text-sm shadow-lg">
                  <FaCheckCircle /> Premium Citizen
                </span>
              ) : (
                <span className="px-4 py-1 rounded-full bg-gray-300 text-black text-sm">
                  {dbUser?.role}
                </span>
              )}
            </div>

            {!isPremium && !isBlocked && (
              <button
                onClick={handleSubscribe}
                className="btn btn-warning mt-6 px-6"
              >
                Upgrade to Premium – 1000 BDT
              </button>
            )}

           {isPremium && lastPayment && (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`mt-8 w-full rounded-2xl p-6 shadow-md ${
      dark
        ? "bg-[#111] border border-[#2c2c2c]"
        : "bg-white border border-gray-200"
    }`}
  >
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xl">💳</span>
      <h3 className="font-semibold text-lg">Premium Payment</h3>
    </div>

    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="opacity-70">Amount</span>
        <span className="font-semibold">
          {lastPayment.amount} {lastPayment.currency}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="opacity-70">Status</span>
        <span className="font-semibold text-green-500">Paid</span>
      </div>

      <div className="flex justify-between">
        <span className="opacity-70">Txn ID</span>
        <span className="font-medium truncate max-w-[60%] text-right">
          {lastPayment.session_id}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="opacity-70">Date</span>
        <span className="font-medium">
          {new Date(lastPayment.date).toLocaleDateString()}{" "}
          {new Date(lastPayment.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  </motion.div>
)}

          </div>

          {/* Right Update Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">Profile Settings</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="font-medium mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input w-full ${
                    dark
                      ? "bg-[#101010] border-[#2d2d2d]"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="font-medium mb-1 block">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className={`input w-full ${
                    dark
                      ? "bg-[#101010] border-[#2d2d2d]"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <button
                disabled={loading}
                className={`btn btn-primary w-full py-3 text-lg ${
                  loading ? "opacity-60" : ""
                }`}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
