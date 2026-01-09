import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const CitizenProgressChart = ({ total, resolved, dark }) => {
  const data = [
    { name: "Resolved", value: resolved },
    { name: "Remaining", value: Math.max(total - resolved, 0) },
  ];

  const COLORS = dark
    ? ["#22c55e", "#2a2a2a"]
    : ["#22c55e", "#e5e7eb"];

  return (
    <div
      className={`rounded-xl p-6 border shadow w-full ${
        dark ? "bg-[#181818] border-[#333]" : "bg-white border-gray-200"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 text-center ${
          dark ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Issue Resolution Progress
      </h3>

      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center mt-4 text-sm opacity-70">
        {resolved} of {total} issues resolved
      </p>
    </div>
  );
};

export default CitizenProgressChart;
