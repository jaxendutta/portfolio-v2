// src/components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ColorSet } from "@/lib/theme";

type Theme = keyof ColorSet;

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("DARK");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Get the theme from localStorage if available
        const localStorageTheme = localStorage.getItem("theme") as Theme | null;
        const systemSettingDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const initialTheme =
            localStorageTheme ?? (systemSettingDark ? "DARK" : "LIGHT");
        setTheme(initialTheme);
        setMounted(true);

        // Add listener for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "DARK" : "LIGHT";
                setTheme(newTheme);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Toggle the dark/light classes for Tailwind
        if (theme === "DARK") {
            document.documentElement.classList.add("DARK");
            document.documentElement.classList.remove("LIGHT");
        } else {
            document.documentElement.classList.remove("DARK");
            document.documentElement.classList.add("LIGHT");
        }
    }, [theme, mounted]);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Avoid rendering with default theme to prevent flashing
    if (!mounted) {
        return <div className="hidden" />;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
