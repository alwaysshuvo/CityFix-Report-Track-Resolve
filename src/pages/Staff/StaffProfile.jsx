import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ThemeContext } from "../../provider/ThemeContext";

const StaffProfile = () => {
  const { user, role, loading } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`
        w-full max-w-2xl mx-auto
        p-4 sm:p-6 md:p-8
        rounded-2xl shadow-lg border
        transition-all duration-300
        ${dark ? "bg-[#111] text-white border-[#333]" : "bg-white text-gray-800 border-gray-200"}
      `}
    >
      <div className="flex flex-col items-center text-center gap-4 mb-6">
        {/* Avatar */}
        <img
          src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full border shadow-md object-cover"
        />

        <h1 className="text-2xl sm:text-3xl font-bold">
          My Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
        <ProfileField label="Name" value={user?.displayName || "Not provided"} />
        <ProfileField label="Email" value={user?.email} />

        <ProfileField
          label="Role"
          value={<span className="capitalize">{role || "staff"}</span>}
        />

        <ProfileField
          label="Account Type"
          value={
            <span className={`${role === "staff" ? "text-blue-500" : "text-gray-500"}`}>
              Staff Account
            </span>
          }
        />
      </div>

      <button
        className={`
          w-full mt-8 py-2 
          rounded-lg font-semibold
          transition
          ${dark ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
        `}
      >
        Update Profile
      </button>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <p className="flex flex-col items-start sm:items-start gap-1">
    <span className="text-sm font-semibold opacity-70">{label}</span>
    <span className="font-medium">{value}</span>
  </p>
);

export default StaffProfile;
