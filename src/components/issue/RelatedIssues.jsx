import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import IssueCard from "../../pages/IssueCard/IssueCard";
import IssueCardSkeleton from "../skeletons/IssueCardSkeleton";

const RelatedIssues = ({ category, currentId }) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["related-issues", category],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/issues`,
        {
          params: { category, limit: 3 },
        }
      );
      return res.data.issues.filter((i) => i._id !== currentId);
    },
    enabled: !!category,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, i) => (
          <IssueCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data.length) return null;

  return (
    <section className="mt-16">
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-6 flex items-center gap-2"
      >
        🔗 Related Issues
      </motion.h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((issue, i) => (
          <motion.div
            key={issue._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* Glow Border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 blur-sm" />

            <div className="relative">
              <IssueCard issue={issue} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedIssues;
