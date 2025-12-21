import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  /* =====================
     Load Mongo User Info
  ======================*/
  const loadUser = () => {
    axios
      .get(`http://localhost:5000/users/${user?.email}`)
      .then((res) => setDbUser(res.data));
  };

  useEffect(() => {
    if (user?.email) loadUser();
  }, [user]);

  /* =====================
      Update Firebase Profile
  ======================*/
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

  /* =====================
      Stripe Checkout
  ======================*/
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/create-checkout-session",
        { email: user?.email }
      );

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Payment Error", err.message, "error");
    }
  };

  if (!dbUser) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isPremium = dbUser?.premium;
  const isBlocked = dbUser?.status === "blocked";

  return (
    <div
      className={`min-h-screen pt-28 pb-16 px-4 transition-all duration-300
      ${dark ? "bg-[#0d0d0d] text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-8 transition
        ${dark ? "bg-[#161616] border border-[#2a2a2a]" : "bg-white border border-gray-200"}`}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          My <span className="text-primary">Profile</span>
        </h1>

        {isBlocked && (
          <div className="alert alert-error mb-5">
            ❌ Your account is blocked! Contact support.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow"
            />

            <h2 className="text-xl font-semibold mt-4">
              {user?.displayName || "No Name Set"}
            </h2>
            <p className={`${dark ? "text-gray-400" : "text-gray-500"}`}>
              {user?.email}
            </p>

            <span className="badge badge-outline mt-2 capitalize">
              {dbUser?.role}
            </span>

            {/* PREMIUM BADGE */}
            {isPremium && (
              <div className="badge badge-warning mt-2">⭐ Premium User</div>
            )}

            {/* SUBSCRIBE BUTTON */}
            {!isPremium && !isBlocked && (
              <button onClick={handleSubscribe} className="btn btn-warning mt-4">
                Subscribe 1000 BDT
              </button>
            )}
          </div>

          {/* RIGHT FORM */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input w-full ${
                    dark
                      ? "bg-[#111] border-[#333] text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className={`input w-full ${
                    dark
                      ? "bg-[#111] border-[#333] text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <button disabled={loading} className="btn btn-primary w-full">
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
