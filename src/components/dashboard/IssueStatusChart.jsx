import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#facc15", "#8b5cf6", "#22c55e"];

const IssueStatusChart = ({ data, dark }) => {
  return (
    <div
      className={`rounded-xl p-5 shadow-xl border transition-all
      ${dark ? "bg-[#1b1b1b] border-[#3a3a3a]" : "bg-white border-gray-300"}`}
    >
      <h3
        className={`text-lg font-semibold mb-4 text-center
        ${dark ? "text-blue-400" : "text-blue-700"}`}
      >
        Issue Status Distribution
      </h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueStatusChart;
