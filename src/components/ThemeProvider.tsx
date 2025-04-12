// src/components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    colors: {
        background: string;
        text: string;
        accent: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
    dark: {
        background: "#17181C",
        text: "#F4F1EA",
        accent: "#D7482F",
    },
    light: {
        background: "#F4F1EA",
        text: "#001ECB",
        accent: "#28B7D0",
    },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [colors, setColors] = useState(themeColors.dark);

    useEffect(() => {
        // Get the theme from localStorage if available
        const localStorageTheme = localStorage.getItem("theme") as Theme | null;
        const systemSettingDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const initialTheme =
            localStorageTheme ?? (systemSettingDark ? "dark" : "light");
        setTheme(initialTheme);
        setColors(
            initialTheme === "dark" ? themeColors.dark : themeColors.light
        );

        // Add listener for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "dark" : "light";
                setTheme(newTheme);
                setColors(
                    newTheme === "dark" ? themeColors.dark : themeColors.light
                );
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        // Update the data-theme attribute on the document element
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(theme);

        // Update CSS variables for theming
        document.documentElement.style.setProperty(
            "--bg-color",
            colors.background
        );
        document.documentElement.style.setProperty("--text-color", colors.text);
        document.documentElement.style.setProperty(
            "--accent-color",
            colors.accent
        );
    }, [theme, colors]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setColors(newTheme === "dark" ? themeColors.dark : themeColors.light);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
