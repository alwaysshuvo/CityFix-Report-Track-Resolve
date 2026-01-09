import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StaffIssueChart = ({ data, dark }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow border w-full
      ${dark ? "bg-[#111] border-[#333]" : "bg-white border-gray-200"}`}
    >
      <h3
        className={`text-lg font-semibold mb-4 text-center
        ${dark ? "text-blue-400" : "text-blue-700"}`}
      >
        Work Progress Overview
      </h3>

      <div className="w-full h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaffIssueChart;
