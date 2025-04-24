import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

// Check if user has a saved preference or use their system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    const theme = savedTheme === "dark" ? true : false;
    return theme;
  }
  // Check if user prefers dark mode
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
  return theme;
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  const toggleTheme = () => {
    setIsDark((p) => !p);
  };

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme: isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
