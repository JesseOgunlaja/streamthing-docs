"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils";

interface PropsType {
	children: React.ReactNode;
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

const StateProvider = ({ children }: PropsType) => {
	const [theme, setTheme] = useState("");

	useEffect(() => {
		const themeCookie = getCookie("theme");
		setTheme(themeCookie || "dark");
	}, []);

	useEffect(() => {
		setCookie("theme", theme, 365);
		if (theme === "dark") {
			document.body.classList.remove("light-theme");
		} else {
			document.body.classList.remove("dark-theme");
		}
		document.body.classList.add(`${theme}-theme`);
	}, [theme]);

	function toggleTheme() {
		setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
	}

	if (!theme) return null;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default StateProvider;
