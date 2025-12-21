import React, { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import IssueCard from "../IssueCard/IssueCard";
import { ThemeContext } from "../../provider/ThemeContext";

const PAGE_SIZE = 6;

const AllIssues = () => {
  const { dark } = useContext(ThemeContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/issues");
      setIssues(res.data);
    } catch (err) {
      console.error("Failed to load issues", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let list = [...issues];

    // search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.location && it.location.toLowerCase().includes(q)) ||
          (it.category && it.category.toLowerCase().includes(q))
      );
    }

    // filters
    if (categoryFilter !== "all")
      list = list.filter((it) => it.category === categoryFilter);
    if (statusFilter !== "all")
      list = list.filter((it) => it.status === statusFilter);
    if (priorityFilter !== "all")
      list = list.filter((it) => it.priority?.toLowerCase() === priorityFilter.toLowerCase());

    return list;
  }, [issues, search, categoryFilter, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const uniqueCategories = Array.from(
    new Set(issues.map((i) => i.category))
  ).filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1
        className={`text-3xl font-bold mb-6 ${dark ? "text-white" : "text-black"}`}
      >
        All Issues
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category or location..."
          className={`
            flex-1 px-3 py-2 rounded-md border transition
            ${
              dark
                ? "bg-[#111] border-purple-400/30 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black"
            }
          `}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`
            px-3 py-2 rounded-md border
            ${dark ? "bg-[#111] border-purple-400/30 text-white" : "bg-white border-gray-300"}
          `}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`
            px-3 py-2 rounded-md border
            ${dark ? "bg-[#111] border-purple-400/30 text-white" : "bg-white border-gray-300"}
          `}
        >
          <option value="all">All Status</option>
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="resolved">resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className={`
            px-3 py-2 rounded-md border
            ${dark ? "bg-[#111] border-purple-400/30 text-white" : "bg-white border-gray-300"}
          `}
        >
          <option value="all">All Priority</option>
          <option value="normal">normal</option>
          <option value="high">high</option>
        </select>
      </div>

      {/* Issue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pageItems.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded transition border disabled:opacity-40
            ${dark ? "border-purple-400/40 hover:bg-[#222]" : "border-gray-400 hover:bg-gray-100"}`}
        >
          Prev
        </button>

        <span className="font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded transition border disabled:opacity-40
            ${dark ? "border-purple-400/40 hover:bg-[#222]" : "border-gray-400 hover:bg-gray-100"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllIssues;
