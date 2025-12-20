import { useContext, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "./provider/ThemeContext";

const TestTheme = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(`Theme changed to: ${dark ? "DARK" : "LIGHT"}`);
  }, [dark]);

  return (
    <div
      className={`
        min-h-screen w-full flex flex-col items-center justify-center
        ${dark ? "bg-black text-white" : "bg-white text-black"}
        transition-all duration-300
      `}
    >
      <h1 className="text-5xl font-bold mb-6">
        {dark ? "🌙 Dark Mode Active" : "☀️ Light Mode Active"}
      </h1>

      <button onClick={toggleTheme} className="btn btn-primary">
        {dark ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export default TestTheme;
