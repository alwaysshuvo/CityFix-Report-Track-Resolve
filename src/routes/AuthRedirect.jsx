import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";

const AuthRedirect = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;

  return <Navigate to="/dashboard" replace />;
};

export default AuthRedirect;
