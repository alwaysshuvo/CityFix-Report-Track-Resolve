const Hero = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 
                       bg-gradient-to-r from-blue-50 to-purple-50">

      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
        Fix Your City Problems with  
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent mt-2">
          CityFix
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
        Report issues, track progress, and help create a smarter city.
      </p>

      <a href="/all-issues" className="btn btn-primary btn-lg px-10 mt-8">
        Explore Issues
      </a>
    </section>
  );
};

export default Hero;
