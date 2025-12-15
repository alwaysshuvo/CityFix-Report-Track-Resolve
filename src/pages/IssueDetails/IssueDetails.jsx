import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/public/data/issues.json")
      .then(res => res.json())
      .then(data => {
        const foundIssue = data.find(item => item.id === id);
        setIssue(foundIssue);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-3xl font-bold mb-4">Issue Not Found</h2>
        <Link to="/all-issues" className="btn btn-primary">
          Back to All Issues
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-5 bg-base-100">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold mb-2">
            {issue.title}
          </h1>
          <p className="text-gray-600">
            {issue.location} • {issue.category}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-80 object-cover rounded-xl shadow"
            />

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">
                Issue Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {issue.description}
              </p>
            </div>

            {/* TIMELINE (static for now) */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Issue Timeline
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Issue reported</p>
                  <p className="text-sm text-gray-500">
                    Reported by citizen
                  </p>
                </div>
                <div>
                  <p className="font-semibold capitalize">
                    Status: {issue.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Current issue state
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`badge ${
                    issue.status === "resolved"
                      ? "badge-success"
                      : issue.status === "in-progress"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {issue.status}
                </span>
              </p>

              <p>
                <span className="font-medium">Priority:</span>{" "}
                <span
                  className={`badge ${
                    issue.priority === "high"
                      ? "badge-error"
                      : "badge-outline"
                  }`}
                >
                  {issue.priority}
                </span>
              </p>

              <p>
                <span className="font-medium">Upvotes:</span>{" "}
                {issue.upvotes}
              </p>
            </div>

            {/* ACTION BUTTONS (future-ready) */}
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <button className="btn btn-primary w-full">
                Boost Issue (৳100)
              </button>

              <button className="btn btn-outline w-full">
                Edit Issue
              </button>

              <button className="btn btn-outline btn-error w-full">
                Delete Issue
              </button>
            </div>
          </motion.div>

        </div>

        <div className="mt-10">
          <Link to="/all-issues" className="link link-primary">
            ← Back to All Issues
          </Link>
        </div>

      </div>
    </div>
  );
};

export default IssueDetails;
