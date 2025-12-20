import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RoleRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔁 Role based redirect
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;

  return children; // citizen stays in /dashboard
};

export default RoleRedirect;
