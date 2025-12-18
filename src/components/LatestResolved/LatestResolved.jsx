import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestResolved = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        _id: "1",
        title: "Streetlight Fixed",
        location: "Uttara, Dhaka",
        status: "Resolved",
        image:
          "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
      {
        _id: "2",
        title: "Broken Road Repaired",
        location: "Mirpur 10",
        status: "Resolved",
        image:
          "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
      {
        _id: "3",
        title: "Garbage Cleaned",
        location: "Bashundhara R/A",
        status: "Resolved",
        image:
          "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
      {
        _id: "4",
        title: "Water Leakage Fixed",
        location: "Banani",
        status: "Resolved",
        image:
          "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
    ];
    setIssues(mockData);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Latest Resolved Issues
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {issues.map((issue, index) => (
          <motion.div
            key={issue._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white border rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer"
          >
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold mt-4">{issue.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{issue.location}</p>

            <div className="mt-3 flex justify-between items-center">
              <span className="badge badge-success">{issue.status}</span>

              <Link
                to={`/issue/${issue._id}`}
                className="btn btn-outline btn-primary btn-sm"
              >
                View
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/all-issues"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View All Issues →
        </Link>
      </div>
    </section>
  );
};

export default LatestResolved;
