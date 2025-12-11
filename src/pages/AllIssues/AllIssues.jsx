import React, { useEffect, useMemo, useState } from "react";
import IssueCard from "../IssueCard/IssueCard";


const PAGE_SIZE = 6;

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [page, setPage] = useState(1);

  const currentUser = { id: localStorage.getItem("cityfix_user") || null };

  useEffect(() => {
    setLoading(true);
    fetch("/data/issues.json")
      .then((r) => r.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((err) => {
        console.error("Failed to load issues", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpvote = (issueId) => {
    if (!currentUser.id) {
      window.location.href = "/login";
      return;
    }


    const found = issues.find((i) => i.id === issueId);
    if (found.authorId === currentUser.id) {
      alert("You cannot upvote your own issue.");
      return;
    }

    const key = `cityfix_upvotes_${currentUser.id}`;
    const upvoted = JSON.parse(localStorage.getItem(key) || "[]");
    if (upvoted.includes(issueId)) {
      alert("You already upvoted this issue.");
      return;
    }

    setIssues((prev) => prev.map((it) => (it.id === issueId ? { ...it, upvotes: it.upvotes + 1 } : it)));

    upvoted.push(issueId);
    localStorage.setItem(key, JSON.stringify(upvoted));
  };

  const filtered = useMemo(() => {
    let list = [...issues];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.location && it.location.toLowerCase().includes(q)) ||
          (it.category && it.category.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== "all") list = list.filter((it) => it.category === categoryFilter);
    if (statusFilter !== "all") list = list.filter((it) => it.status === statusFilter);
    if (priorityFilter !== "all") list = list.filter((it) => it.priority === priorityFilter);


    list.sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1;
      if (b.priority === "high" && a.priority !== "high") return 1;
      return b.upvotes - a.upvotes;
    });

    return list;
  }, [issues, search, categoryFilter, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const uniqueCategories = Array.from(new Set(issues.map((i) => i.category))).filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loader">Loading…</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Issues</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category or location..."
          className="flex-1 border px-3 py-2 rounded-md"
        />

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border px-3 py-2 rounded-md">
          <option value="all">All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-md">
          <option value="all">All Status</option>
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="resolved">resolved</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="border px-3 py-2 rounded-md">
          <option value="all">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pageItems.map((issue) => {
          const userUpvoted = (() => {
            const key = `cityfix_upvotes_${currentUser.id}`;
            const list = JSON.parse(localStorage.getItem(key) || "[]");
            return list.includes(issue.id);
          })();

          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              onUpvote={handleUpvote}
              currentUserId={currentUser.id}
              userUpvoted={userUpvoted}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllIssues;
