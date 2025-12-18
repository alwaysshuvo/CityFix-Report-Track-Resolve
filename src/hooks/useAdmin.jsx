import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/admin/${user.email}`)
        .then((res) => {
          setIsAdmin(res.data.admin);
          adminLoading(false);
        });
    } else {
      setAdminLoading(false);
    }
  }, [user]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
