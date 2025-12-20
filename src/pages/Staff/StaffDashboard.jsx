import { useEffect, useState } from "react";
import axios from "axios";

const StaffDashboard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/staff/issues", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => setCount(res.data.length));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      <div className="bg-base-200 rounded-xl p-6 shadow w-fit">
        <h3 className="text-gray-500 text-sm">Assigned Issues</h3>
        <p className="text-4xl font-bold mt-2">{count}</p>
      </div>
    </div>
  );
};

export default StaffDashboard;
