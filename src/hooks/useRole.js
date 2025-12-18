import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${user.email}`
        );
        setRole(res.data?.role || "citizen");
      } catch (error) {
        console.error("Failed to fetch role", error);
        setRole("citizen");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, loading };
};

export default useRole;
