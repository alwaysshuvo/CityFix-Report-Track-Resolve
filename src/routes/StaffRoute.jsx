import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const StaffRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user || role !== "staff") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StaffRoute;
