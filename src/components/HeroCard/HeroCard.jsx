const HeroCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow hover:shadow-lg 
                    transition border text-center">

      <h2 className="text-2xl font-bold mb-2">Why CityFix?</h2>

      <p className="text-gray-600">
        A modern platform allowing citizens to report, track, and resolve 
        public infrastructure issues faster & efficiently.
      </p>

      <div className="flex justify-center gap-6 mt-5">
        <div className="badge badge-primary p-4 text-lg">Fast Response</div>
        <div className="badge badge-secondary p-4 text-lg">Tracking</div>
        <div className="badge badge-accent p-4 text-lg">Smart System</div>
      </div>
    </div>
  );
};

export default HeroCard;
