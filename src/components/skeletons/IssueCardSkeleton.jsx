import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeContext";

const IssueCardSkeleton = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-xl border p-4 animate-pulse ${
        dark
          ? "bg-[#111] border-purple-400/20"
          : "bg-white border-gray-200"
      }`}
    >
      {/* image */}
      <div className="w-full h-40 bg-gray-300/30 rounded-md" />

      {/* title */}
      <div className="h-5 bg-gray-300/40 rounded mt-4 w-3/4" />

      {/* location */}
      <div className="h-4 bg-gray-300/30 rounded mt-2 w-1/2" />

      {/* footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 w-20 bg-gray-300/40 rounded" />
        <div className="h-8 w-20 bg-gray-300/40 rounded" />
      </div>
    </div>
  );
};

export default IssueCardSkeleton;
