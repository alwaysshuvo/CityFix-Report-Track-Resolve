import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

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
        text: "Your profile information has been updated successfully",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-28 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          My <span className="text-primary">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="flex flex-col items-center text-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow"
            />

            <h2 className="text-xl font-semibold mt-4">
              {user?.displayName || "CityFix User"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>

            <span className="mt-3 badge badge-outline badge-primary">
              Citizen
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Update Profile Information
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
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
                  className="input input-bordered w-full"
                  placeholder="Paste image URL"
                />
              </div>

              <button
                disabled={loading}
                className="btn btn-primary w-full"
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
