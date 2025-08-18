import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = (): React.ReactNode => {
  const [dark, setDark] = useState(false); // default = light

  // On mount → check localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
    }
  }, []);

  // Apply theme on change
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="px-3 py-1 rounded-lg bg-primary"
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
