import React from "react";
import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue, onUpvote, currentUserId, userUpvoted }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/issue/${issue.id}`);
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote(issue.id);
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="h-44 w-full bg-gray-100 flex items-center justify-center">
        <img
          src={issue.image || "/images/placeholder.png"}
          alt={issue.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{issue.title}</h3>
            <p className="text-sm text-gray-500">{issue.location}</p>
          </div>

          <div className="text-right">
            <div
              className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${
                issue.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : issue.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {issue.status}
            </div>

            <div className={`mt-2 text-xs px-2 py-1 rounded inline-block ${issue.priority === "high" ? "bg-red-100 text-red-800" : "bg-blue-50 text-blue-800"}`}>
              {issue.priority === "high" ? "High" : "Normal"}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{issue.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUpvote}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition ${
                userUpvoted ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10h4v8H2zM6 6h4v12H6zM14 4h-2v14h2a2 2 0 002-2V6a2 2 0 00-2-2z"/></svg>
              <span>{issue.upvotes + (userUpvoted ? 0 : 0)}</span>
            </button>

            <span className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{issue.category}</span></span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleView} className="text-sm px-3 py-1 border rounded hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
