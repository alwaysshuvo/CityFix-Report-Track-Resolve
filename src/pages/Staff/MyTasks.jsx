import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const MyTasks = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/issues")
      .then(res => {
        const assigned = res.data.filter(
          issue => issue.assignedStaff?.email === user.email
        );
        setIssues(assigned);
      });
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Assigned Issues</h2>

      {issues.map(issue => (
        <div key={issue._id} className="card bg-base-200 mb-4 p-4">
          <h3 className="font-bold">{issue.title}</h3>
          <p>Status: {issue.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyTasks;
