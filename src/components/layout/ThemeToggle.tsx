"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f9d423]/40"
      aria-label="Toggle theme"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === "dark"
            ? "translate-x-7 bg-[#333] text-[#f9d423]"
            : "translate-x-0 bg-[#f9d423] text-[#333]"
        }`}
      >
        {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </span>
    </button>
  );
}
