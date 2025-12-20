import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role || "citizen");
          setRoleLoading(false);
        })
        .catch(() => {
          setRole("citizen");
          setRoleLoading(false);
        });
    }

    if (!loading && !user) {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user, loading]);

  return { role, loading: roleLoading };
};

export default useRole;
