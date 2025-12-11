import { FaCamera, FaUserCheck, FaTruck, FaCheck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaCamera className="text-blue-500 text-4xl" />,
      title: "Report an Issue",
      desc: "Submit issue details with photo and location instantly.",
    },
    {
      icon: <FaUserCheck className="text-purple-500 text-4xl" />,
      title: "Admin Review",
      desc: "Admin verifies issue and assigns to a staff.",
    },
    {
      icon: <FaTruck className="text-yellow-500 text-4xl" />,
      title: "Staff Action",
      desc: "Assigned staff investigates & updates progress timeline.",
    },
    {
      icon: <FaCheck className="text-green-500 text-4xl" />,
      title: "Issue Resolved",
      desc: "Citizen gets updates until final resolution.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">How CityFix Works</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition text-center border">
            <div className="flex justify-center mb-3">{s.icon}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
