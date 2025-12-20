import { useContext } from "react";
import { ThemeContext } from "./provider/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Test = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
      bg-white text-black dark:bg-black dark:text-white transition">
      
      <h1 className="text-4xl font-bold mb-6">
        {dark ? "DARK MODE" : "LIGHT MODE"}
      </h1>

      <button
        onClick={toggleTheme}
        className="btn btn-primary"
      >
        {dark ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export default Test;
