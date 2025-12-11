import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is CityFix?",
    answer:
      "CityFix is a public infrastructure issue reporting system where citizens can report problems like road damage, streetlight issues, drainage problems, and track issue status in real-time.",
  },
  {
    question: "How do I report an issue?",
    answer:
      "Simply create an account, go to the 'Report Issue' page, fill in the details, upload a photo, and submit. You can track progress anytime.",
  },
  {
    question: "Can I boost my issue for faster response?",
    answer:
      "Yes! You can boost priority by making a small payment. Boosted issues appear on top and get faster response from staff.",
  },
  {
    question: "Who manages the issues?",
    answer:
      "CityFix staff and admin manage verification, assignment, updates, and resolution. Staff update progress in timeline.",
  },
  {
    question: "Can I edit or delete my issue?",
    answer:
      "Yes, you can edit or delete your own issue if its status is still pending.",
  },
  {
    question: "How does upvoting work?",
    answer:
      "Citizens can upvote issues to highlight importance. Each user can upvote once and not their own issue.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-5">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Find answers to your questions about using CityFix.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left p-5 flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold text-gray-800 text-lg">
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-primary text-xl"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
