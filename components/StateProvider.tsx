"use client";

import { setCookie } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface PropsType {
  children: React.ReactNode;
  theme: string;
}

interface ContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextType>({
  theme: "",
  toggleTheme: () => "",
});
export const useTheme = () => useContext(ThemeContext);

const StateProvider = ({ children, theme: startingTheme }: PropsType) => {
  const [theme, setTheme] = useState(startingTheme);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    setCookie("theme", theme, 365);
    document.body.classList.add(`${theme}-theme`);

    if (theme === "dark") {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default StateProvider;
