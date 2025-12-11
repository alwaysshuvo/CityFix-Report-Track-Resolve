import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-28 pb-20 px-5 bg-base-100 text-gray-700">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-extrabold">
          About <span className="text-primary">CityFix</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          CityFix is a modern public infrastructure issue reporting system built to
          improve city services, transparency, and citizen experience.
        </p>
      </motion.div>

      {/* WHO WE ARE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12 mb-14"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          CityFix is designed to bridge the communication gap between citizens and municipal
          authorities. We help communities report issues like broken roads, damaged streetlights,
          drainage problems, garbage overflow, and more — ensuring faster responses and proper tracking.
        </p>
      </motion.div>

      {/* OUR MISSION + OUR VISION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-500/90 to-purple-500/90 text-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            To empower citizens with a seamless platform where reporting civic issues becomes
            fast, transparent, and impactful — helping local authorities respond efficiently.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-fuchsia-500/90 to-pink-500/90 text-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="leading-relaxed">
            To create smart, responsive cities where every reported issue is tracked, resolved,
            and used to improve the quality of life for millions of people.
          </p>
        </motion.div>

      </div>

      {/* WHAT WE DO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white rounded-xl p-10 shadow-lg border border-gray-100 mb-14"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">What We Do</h2>

        <ul className="space-y-4 text-gray-600">
          <li>✔ Help citizens report real-world issues instantly</li>
          <li>✔ Ensure faster response from city authorities</li>
          <li>✔ Provide transparent issue tracking with timeline</li>
          <li>✔ Allow premium boosting for urgent problems</li>
          <li>✔ Support staff assignment and efficient workflow</li>
          <li>✔ Offer dashboards for admin, staff, and citizens</li>
        </ul>
      </motion.div>

      {/* ACHIEVEMENTS */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {[
            { number: "10K+", label: "Issues Reported" },
            { number: "95%", label: "Resolved Successfully" },
            { number: "50+", label: "Staff Members" },
            { number: "99%", label: "Citizen Satisfaction" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
            >
              <h3 className="text-3xl font-extrabold text-primary">{item.number}</h3>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </motion.div>
          ))}

        </div>
      </motion.div>
    </div>
  );
};

export default About;
