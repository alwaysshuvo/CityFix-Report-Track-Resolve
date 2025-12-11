import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestResolved = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        _id: "1",
        title: "Streetlight Fixed",
        location: "Uttara, Dhaka",
        status: "Resolved",
        image: "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
      {
        _id: "2",
        title: "Broken Road Repaired",
        location: "Mirpur 10",
        status: "Resolved",
        image: "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
      {
        _id: "3",
        title: "Garbage Cleaned",
        location: "Bashundhara R/A",
        status: "Resolved",
        image: "https://i.pinimg.com/1200x/7e/34/a5/7e34a57c1144a21fe1ffdde78ab4eb80.jpg",
      },
    ];

    setIssues(mockData);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Latest Resolved Issues
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold mt-4">{issue.title}</h3>

            <p className="text-gray-600 text-sm mt-1">{issue.location}</p>

            <div className="mt-3 flex justify-between items-center">
              <span className="badge badge-success">{issue.status}</span>

              <Link
                to={`/issue/${issue._id}`}
                className="btn btn-outline btn-primary btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestResolved;
