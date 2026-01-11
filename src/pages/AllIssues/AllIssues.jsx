import { useEffect, useState, useContext } from "react";
import axios from "axios";
import IssueCard from "../IssueCard/IssueCard";
import IssueCardSkeleton from "../../components/skeletons/IssueCardSkeleton";
import { ThemeContext } from "../../provider/ThemeContext";
import { FiSearch } from "react-icons/fi";

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
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* TITLE */}
      <h1
        className={`text-3xl md:text-4xl font-extrabold mb-8 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        All Issues
      </h1>

      {/* FILTER BAR */}
      <div
        className={`mb-8 rounded-2xl p-4 md:p-5 grid gap-3 md:grid-cols-5 border shadow-sm
          ${
            dark
              ? "bg-[#111] border-purple-500/20"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* SEARCH */}
        <div className="md:col-span-2 relative">
          <FiSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search issues..."
            className={`w-full pl-10 pr-3 py-2 rounded-xl outline-none border transition
              ${
                dark
                  ? "bg-[#1a1a1a] border-purple-400/30 text-white placeholder-gray-400 focus:border-purple-500"
                  : "bg-white border-gray-300 focus:ring-2 focus:ring-indigo-400"
              }
            `}
          />
        </div>

        {/* CATEGORY */}
        <select
          value={categoryFilter}
          onChange={(e) => {
            setPage(1);
            setCategoryFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-xl border outline-none transition
            ${
              dark
                ? "bg-[#1a1a1a] border-purple-400/30 text-white"
                : "bg-white border-gray-300"
            }
          `}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-xl border outline-none transition
            ${
              dark
                ? "bg-[#1a1a1a] border-purple-400/30 text-white"
                : "bg-white border-gray-300"
            }
          `}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* PRIORITY */}
        <select
          value={priorityFilter}
          onChange={(e) => {
            setPage(1);
            setPriorityFilter(e.target.value);
          }}
          className={`px-3 py-2 rounded-xl border outline-none transition
            ${
              dark
                ? "bg-[#1a1a1a] border-purple-400/30 text-white"
                : "bg-white border-gray-300"
            }
          `}
        >
          <option value="">All Priority</option>
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <div
          className={`text-center mt-16 text-lg ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No issues found matching your filters.
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          className={`px-5 py-2 rounded-xl font-medium transition disabled:opacity-40
            ${
              dark
                ? "bg-[#1a1a1a] text-white hover:bg-[#222]"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          ← Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
          className={`px-5 py-2 rounded-xl font-medium transition disabled:opacity-40
            ${
              dark
                ? "bg-[#1a1a1a] text-white hover:bg-[#222]"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default AllIssues;
