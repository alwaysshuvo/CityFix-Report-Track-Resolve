import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 prevent redirect loop
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;

  // citizen stays here
  return children;
};

export default AuthRedirect;
