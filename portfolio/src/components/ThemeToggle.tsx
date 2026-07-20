"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      data-cursor-hover
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:scale-105 transition-transform"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
