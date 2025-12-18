const StaffProfile = () => {
  return (
    <div className="max-w-xl bg-base-200 p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="space-y-4">
        <p><strong>Name:</strong> Staff User</p>
        <p><strong>Email:</strong> staff@cityfix.com</p>
        <button className="btn btn-primary btn-sm">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default StaffProfile;
