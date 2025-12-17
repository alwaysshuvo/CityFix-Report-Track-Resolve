import { motion } from "framer-motion";

const stats = [
  { title: "Total Issues", value: 12, color: "from-blue-500 to-blue-600" },
  { title: "Pending Issues", value: 4, color: "from-yellow-400 to-yellow-500" },
  { title: "In Progress", value: 3, color: "from-purple-500 to-purple-600" },
  { title: "Resolved Issues", value: 5, color: "from-green-500 to-green-600" },
  { title: "Total Payments (৳)", value: 1200, color: "from-pink-500 to-pink-600" },
];

const UserDashboard = () => {
  return (
    <div className="p-6 md:p-10">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-extrabold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Track your reported issues and activities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-5 text-white bg-gradient-to-r ${item.color} shadow-lg`}
          >
            <p className="text-sm font-medium opacity-90">
              {item.title}
            </p>
            <h2 className="text-3xl font-extrabold mt-2">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          Activity Summary
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Pending</span>
              <span>33%</span>
            </div>
            <progress className="progress progress-warning w-full" value="33" max="100"></progress>

            <div className="flex justify-between text-sm">
              <span>In Progress</span>
              <span>25%</span>
            </div>
            <progress className="progress progress-secondary w-full" value="25" max="100"></progress>

            <div className="flex justify-between text-sm">
              <span>Resolved</span>
              <span>42%</span>
            </div>
            <progress className="progress progress-success w-full" value="42" max="100"></progress>
          </div>

          <div className="flex-1 text-gray-600 text-sm">
            <p>
              This summary shows how your reported issues are progressing.
              Keep reporting issues to help improve your city faster 🚀
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default UserDashboard;
