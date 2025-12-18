import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-slate-100 to-white text-slate-700">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          About <span className="text-blue-600">CityFix</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          CityFix empowers communities with a simple digital platform to report infrastructure issues and drive faster city improvements.
        </p>
      </motion.div>

      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-20 rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          src="https://i.ibb.co.com/mVD3P1Vf/The-Essential-Guide-to-Building-Maintenance-in-San-Diego.jpg"
          alt="City Collaboration"
          className="w-full object-cover h-80 md:h-96"
        />
      </motion.div>

      {/* Our Purpose */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-10 md:p-14 mb-20"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-5">Who We Are</h2>
        <p className="text-slate-600 leading-relaxed text-lg">
          CityFix bridges the communication gap between citizens and local authorities.  
          Whether it’s potholes, broken streetlights, drainage failures, garbage overflow,
          or unsafe roads — CityFix ensures issues are submitted, verified, assigned, monitored and resolved transparently.
        </p>
      </motion.div>

      {/* Mission + Vision */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white border shadow-lg rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed">
            Empower citizens with a simplified platform where city problems
            can be reported instantly — resulting in clean records, faster actions, and improved transparency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white border shadow-lg rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed">
            Build smart cities where every public issue is traceable,  
            every action is accountable, and every citizen plays a meaningful role in improving urban life.
          </p>
        </motion.div>

      </div>

      {/* What We Do */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-12 mb-24"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-8">What We Do</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-slate-600 text-lg">
          <li>✔ Help citizens report public issues instantly</li>
          <li>✔ Enable authorities to respond faster</li>
          <li>✔ Maintain transparent resolution timelines</li>
          <li>✔ Support premium boosts for urgent problems</li>
          <li>✔ Assign staff and manage workload intelligently</li>
          <li>✔ Provide dashboards for Admin, Staff & Citizens</li>
        </ul>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Impact Snapshot
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Issues Reported" },
            { number: "95%", label: "Resolved Rate" },
            { number: "50+", label: "Active Staff" },
            { number: "99%", label: "Citizen Satisfaction" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.06 }}
              className="bg-white p-8 rounded-2xl text-center shadow-md border"
            >
              <h3 className="text-4xl font-extrabold text-blue-600">{item.number}</h3>
              <p className="text-slate-600 mt-2 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
