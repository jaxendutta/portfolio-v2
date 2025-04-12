"use client";

import { COLORS, BACKGROUNDS, FILTERS } from "@/lib/theme";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    colors: {
        background: string;
        text: string;
        accent: string;
        scroll: string;
        highlightBg: string;
        highlightText: string;
        fontBackground: string;
        svgFilter: string;
        noiseFilter: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeValues = {
    dark: {
        background: COLORS.DARK.BACKGROUND,
        text: COLORS.DARK.TEXT,
        accent: COLORS.DARK.ACCENT,
        scroll: COLORS.DARK.SCROLL,
        highlightBg: COLORS.DARK.HIGHLIGHT_BG,
        highlightText: COLORS.DARK.HIGHLIGHT_TEXT,
        fontBackground: BACKGROUNDS.DARK.FONT,
        svgFilter: FILTERS.DARK.SVG,
        noiseFilter: FILTERS.DARK.NOISE,
    },
    light: {
        background: COLORS.LIGHT.BACKGROUND,
        text: COLORS.LIGHT.TEXT,
        accent: COLORS.LIGHT.ACCENT,
        scroll: COLORS.LIGHT.SCROLL,
        highlightBg: COLORS.LIGHT.HIGHLIGHT_BG,
        highlightText: COLORS.LIGHT.HIGHLIGHT_TEXT,
        fontBackground: BACKGROUNDS.LIGHT.FONT,
        svgFilter: FILTERS.LIGHT.SVG,
        noiseFilter: FILTERS.LIGHT.NOISE,
    },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [colors, setColors] = useState(themeValues.dark);
    const [mounted, setMounted] = useState(false);

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
            initialTheme === "dark" ? themeValues.dark : themeValues.light
        );
        setMounted(true);

        // Add listener for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                const newTheme = e.matches ? "dark" : "light";
                setTheme(newTheme);
                setColors(
                    newTheme === "dark" ? themeValues.dark : themeValues.light
                );
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Update the data-theme attribute on the document element
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(theme);

        // Update CSS variables for theming
        document.documentElement.style.setProperty(
            "--background-color",
            colors.background
        );
        document.documentElement.style.setProperty("--font-color", colors.text);
        document.documentElement.style.setProperty(
            "--accent-color",
            colors.accent
        );
        document.documentElement.style.setProperty(
            "--accent-color-constant",
            colors.accent
        );
        document.documentElement.style.setProperty(
            "--scroll-color",
            colors.scroll
        );
        document.documentElement.style.setProperty(
            "--highlight-color",
            colors.highlightBg
        );
        document.documentElement.style.setProperty(
            "--highlight-font-color",
            colors.highlightText
        );
        document.documentElement.style.setProperty(
            "--font-background",
            colors.fontBackground
        );
        document.documentElement.style.setProperty(
            "--svg-theme-filter",
            colors.svgFilter
        );
        document.documentElement.style.setProperty(
            "--noise-filter",
            colors.noiseFilter
        );
    }, [theme, colors, mounted]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setColors(newTheme === "dark" ? themeValues.dark : themeValues.light);
        localStorage.setItem("theme", newTheme);
    };

    // Avoid rendering with default theme to prevent flashing
    if (!mounted) {
        // Provide a minimal div with no content to ensure hydration doesn't fail
        return <div className="hidden" />;
    }

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
