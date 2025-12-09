const CityFixLoader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-200">

      <h1 className="text-5xl font-extrabold tracking-wide flex gap-2">
        
        <span className="animate-pulse bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          City
        </span>

        <span className="animate-bounce text-primary">
          Fix
        </span>

      </h1>

      <div className="mt-4 w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-[pulse_1.5s_infinite] rounded-full" />

      <div className="flex gap-2 mt-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
      </div>

    </div>
  );
};

export default CityFixLoader;
