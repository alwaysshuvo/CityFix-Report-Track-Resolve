import { useEffect, useState, useContext } from "react";
import axios from "axios";
import IssueCard from "../IssueCard/IssueCard";
import IssueCardSkeleton from "../../components/skeletons/IssueCardSkeleton";
import { ThemeContext } from "../../provider/ThemeContext";

const PAGE_SIZE = 6;

const AllIssues = () => {
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, categoryFilter, statusFilter, priorityFilter]);

  const loadIssues = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/issues`, {
        params: {
          page,
          limit: PAGE_SIZE,
          search,
          category: categoryFilter,
          status: statusFilter,
          priority: priorityFilter,
        },
      });

      setIssues(res.data.issues || []);
      setTotal(res.data.total || 1);
    } catch (err) {
      console.log("❌ Failed loading issues", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const uniqueCategories = Array.from(
    new Set(issues.map((i) => i.category))
  ).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1
        className={`text-3xl font-bold mb-6 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        All Issues
      </h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by title, category or location..."
          className={`flex-1 px-3 py-2 rounded-md border ${
            dark
              ? "bg-[#111] border-purple-400/30 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black"
          }`}
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            setPage(1);
            setCategoryFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-md border ${
            dark
              ? "bg-[#111] border-purple-400/30 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-md border ${
            dark
              ? "bg-[#111] border-purple-400/30 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="">All Status</option>
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="resolved">resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => {
            setPage(1);
            setPriorityFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-md border ${
            dark
              ? "bg-[#111] border-purple-400/30 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="">All Priority</option>
          <option value="normal">normal</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      {/* ISSUE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <IssueCardSkeleton key={i} />
          ))}

        {!loading &&
          issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && issues.length === 0 && (
        <p className="text-center opacity-60 mt-10">
          No issues found
        </p>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          className={`px-3 py-1 rounded border disabled:opacity-40 ${
            dark
              ? "border-purple-400/40 hover:bg-[#222]"
              : "border-gray-400 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
          className={`px-3 py-1 rounded border disabled:opacity-40 ${
            dark
              ? "border-purple-400/40 hover:bg-[#222]"
              : "border-gray-400 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllIssues;
