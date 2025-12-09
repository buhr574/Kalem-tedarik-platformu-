import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    }
    return "dark";
  });

  useEffect(() => {
    // Apply theme to document immediately
    if (typeof document !== "undefined") {
      // Check if we're on a public page
      const isPublicPage =
        document.documentElement.getAttribute("data-public-page") === "true";

      // If on public page, force dark mode
      if (isPublicPage) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
    }
  }, [theme]);

  // Set initial theme on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isPublicPage =
        document.documentElement.getAttribute("data-public-page") === "true";

      if (isPublicPage) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
    }
  }, []);

  const toggleTheme = () => {
    // Don't allow theme toggle on public pages
    if (typeof document !== "undefined") {
      const isPublicPage =
        document.documentElement.getAttribute("data-public-page") === "true";
      if (isPublicPage) {
        return; // Don't toggle on public pages
      }
    }
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
