import { FaCheckCircle, FaUsers, FaBolt, FaMapMarkerAlt } from "react-icons/fa";

const Features = () => {
  const items = [
    {
      icon: <FaMapMarkerAlt className="text-blue-500 text-4xl" />,
      title: "Smart Issue Reporting",
      desc: "Citizens can report issues with photo, location & details instantly.",
    },
    {
      icon: <FaBolt className="text-yellow-500 text-4xl" />,
      title: "Fast Response Workflow",
      desc: "Admin assigns issue to staff and tracks real-time progress updates.",
    },
    {
      icon: <FaUsers className="text-purple-500 text-4xl" />,
      title: "Role-based Dashboard",
      desc: "Separate dashboards for Citizen, Staff & Admin with powerful tools.",
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-4xl" />,
      title: "Transparent Resolution",
      desc: "Track issue lifecycle from reported to resolved with clean timeline.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Key Features of CityFix
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((f, i) => (
          <div
            key={i}
            className="bg-white shadow hover:shadow-xl rounded-xl p-6 transition text-center border"
          >
            <div className="flex justify-center mb  -0">{f.icon}</div>
            <h3 className="text-xl font-semibold mt-3">{f.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
