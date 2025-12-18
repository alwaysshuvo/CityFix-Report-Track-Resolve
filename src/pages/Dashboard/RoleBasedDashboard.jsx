import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

import LoadingSpinner from "../../components/LoadingSpinner";
import AdminDashboard from "../Admin/AdminDashboard";
import StaffDashboard from "../Staff/StaffDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";

const RoleBasedDashboard = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/users/${user.email}`)
      .then((res) => {
        setRole(res.data?.role);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (role === "admin") return <AdminDashboard />;
  if (role === "staff") return <StaffDashboard />;
  return <UserDashboard />;
};

export default RoleBasedDashboard;
