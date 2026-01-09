import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const IssueDetailsSkeleton = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`max-w-5xl mx-auto p-6 rounded-xl shadow mt-10 animate-pulse ${
        dark ? "bg-[#111]" : "bg-white"
      }`}
    >
      {/* Title */}
      <div className="h-8 w-3/4 bg-gray-300/40 rounded mb-4" />

      {/* Image */}
      <div className="w-full h-80 bg-gray-300/30 rounded-xl mb-5" />

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 w-24 bg-gray-300/40 rounded" />
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-gray-300/30 rounded" />
        <div className="h-4 w-5/6 bg-gray-300/30 rounded" />
        <div className="h-4 w-4/6 bg-gray-300/30 rounded" />
      </div>

      {/* Reporter */}
      <div className="h-5 w-40 bg-gray-300/40 rounded mb-2" />
      <div className="h-4 w-60 bg-gray-300/30 rounded mb-6" />

      {/* Assigned staff */}
      <div className="h-5 w-40 bg-gray-300/40 rounded mb-2" />
      <div className="h-4 w-52 bg-gray-300/30 rounded mb-6" />

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 w-28 bg-gray-300/40 rounded" />
        ))}
      </div>

      {/* Timeline */}
      <div className="h-6 w-48 bg-gray-300/40 rounded mb-4" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded p-3 space-y-2">
            <div className="h-4 w-24 bg-gray-300/40 rounded" />
            <div className="h-4 w-5/6 bg-gray-300/30 rounded" />
            <div className="h-3 w-1/3 bg-gray-300/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueDetailsSkeleton;
