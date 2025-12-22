import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useStaffIssues = () => {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/issues/staff/${user.email}`
        );

        const list = Array.isArray(res.data.issues) ? res.data.issues : [];

        setIssues(list);
      } catch (err) {
        console.log(err);
        setError("Failed to load staff issues");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  return { issues, loading, error };
};

export default useStaffIssues;
