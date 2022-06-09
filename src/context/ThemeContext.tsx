import { createContext, useContext, useState, useEffect } from "react";
import { Themes } from "../types/Themes.type";

// Check if code runs on client
const isClient = typeof document !== "undefined";

type ThemeContextType = {
  theme: Themes;
  isDark: boolean;
  toggle: () => void;
};

const themeContextDefaultValues: ThemeContextType = {
  theme: "light",
  isDark: false,
  toggle: () => {},
};

const ThemeContext = createContext<ThemeContextType>(themeContextDefaultValues);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>("light");

  const toggle = () => {
    setTheme((val) => {
      const nextVal = val === "light" ? "dark" : "light";

      // Save state in local storage
      window.localStorage.setItem("theme", nextVal);

      return nextVal;
    });
  };

  // Set previously used theme
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as Themes | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Run client side only
  if (isClient) {
    const html = document.documentElement;

    // Toggle tailwind dark mode by toggling <dark> class on html tag
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }

  const value = {
    theme,
    isDark: theme === "dark",
    toggle,
  };

  return (
    <>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
};
