import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeContext";

const IssueCard = ({ issue, onUpvote, currentUserId, userUpvoted }) => {
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);

  const handleView = () => {
    navigate(`/issue/${issue.id}`);
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote(issue.id);
  };

  return (
    <div
      className={`
        rounded-xl overflow-hidden shadow transition border cursor-pointer
        ${dark ? "bg-[#111] border-[#2a2a2a] text-white" : "bg-white border-gray-200 text-gray-900"}
      `}
      onClick={handleView}
    >
      {/* IMAGE */}
      <div className="h-44 w-full bg-gray-200 dark:bg-[#1a1a1a] flex items-center justify-center">
        <img
          src={issue.image || "/images/placeholder.png"}
          alt={issue.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Title + status/priority */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{issue.title}</h3>
            <p className="text-sm opacity-70">{issue.location}</p>
          </div>

          <div className="text-right">
            {/* STATUS */}
            <div
              className={`
                inline-flex items-center text-xs font-semibold px-2 py-1 rounded capitalize
                ${
                  issue.status === "resolved"
                    ? dark
                      ? "bg-green-900/40 text-green-300"
                      : "bg-green-100 text-green-700"
                    : issue.status === "in-progress"
                    ? dark
                      ? "bg-yellow-900/40 text-yellow-300"
                      : "bg-yellow-100 text-yellow-800"
                    : dark
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                }
              `}
            >
              {issue.status}
            </div>

            {/* PRIORITY */}
            <div
              className={`
                mt-2 text-xs px-2 py-1 rounded inline-block capitalize
                ${
                  issue.priority === "high"
                    ? dark
                      ? "bg-red-900/40 text-red-300"
                      : "bg-red-100 text-red-800"
                    : dark
                    ? "bg-blue-900/40 text-blue-300"
                    : "bg-blue-50 text-blue-800"
                }
              `}
            >
              {issue.priority}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mt-3 line-clamp-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>
          {issue.description}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* Upvote */}
            <button
              onClick={handleUpvote}
              className={`
                inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition
                ${
                  userUpvoted
                    ? "bg-blue-600 text-white"
                    : dark
                    ? "bg-[#222] hover:bg-[#333] text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }
              `}
            >
              👍 {issue.upvotes}
            </button>

            <span className="text-sm opacity-70">
              Category:{" "}
              <span className="font-medium opacity-90">{issue.category}</span>
            </span>
          </div>

          {/* View */}
          <button
            onClick={handleView}
            className={`
              text-sm px-3 py-1 rounded border transition
              ${
                dark
                  ? "border-gray-600 text-gray-200 hover:bg-[#222]"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
