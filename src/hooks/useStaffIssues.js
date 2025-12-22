import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const useStaffIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE}/issues/staff/${user.email}`)
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assigned issues");
        setLoading(false);
      });
  }, [user]);

  return { issues, loading, error };
};

export default useStaffIssues;
