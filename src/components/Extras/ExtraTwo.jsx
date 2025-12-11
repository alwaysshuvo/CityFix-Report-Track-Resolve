import { Link } from "react-router-dom";

const ExtraTwo = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-white border rounded-xl p-12 shadow text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to Improve Your City?</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join thousands of citizens making their city better. Report issues easily and track progress.
        </p>

        <Link
          to="/report-issue"
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
        >
          Report an Issue
        </Link>
      </div>
    </section>
  );
};

export default ExtraTwo;
