import { useContext } from "react";

import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "./provider/ThemeContext";

const TestTheme = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className="
        min-h-screen w-full flex flex-col items-center justify-center
        bg-white text-black
        dark:bg-black dark:text-white
        transition-all duration-300
      "
    >
      <h1 className="text-5xl font-bold mb-6">
        {dark ? "🌙 Dark Mode Active" : "☀️ Light Mode Active"}
      </h1>

      <button
        onClick={toggleTheme}
        className="btn btn-primary"
      >
        {dark ? <Sun /> : <Moon />}
      </button>

      <p className="mt-6 text-lg opacity-80">
        Click button to toggle theme.
      </p>
    </div>
  );
};

export default TestTheme;
