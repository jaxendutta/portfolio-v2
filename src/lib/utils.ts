// src/lib/utils.ts (add these functions)
import { twMerge } from "tailwind-merge";
import { ThemeOption } from "@/lib/theme";

// Helper for getting theme classes without string interpolation
export function getThemeClass(
    type:
        | "bg"
        | "text"
        | "border"
        | "highlight-bg"
        | "highlight-text"
        | "accent",
    theme: ThemeOption
): string {
    const prefix = type.startsWith("highlight") ? "theme-" : "theme-";
    return `${type.startsWith("highlight") ? type : type}-${prefix}${type}-${theme.toLowerCase()}`;
}

// Convenient function for common theme classes
export function getThemedClasses(
    theme: ThemeOption,
    options: {
        bg?: boolean;
        text?: boolean;
        accent?: boolean;
        highlightBg?: boolean;
        highlightText?: boolean;
    }
): string {
    return twMerge(
        options.bg && `bg-theme-bg-${theme.toLowerCase()}`,
        options.text && `text-theme-text-${theme.toLowerCase()}`,
        options.accent && `text-theme-accent-${theme.toLowerCase()}`,
        options.highlightBg && `bg-theme-highlight-bg-${theme.toLowerCase()}`,
        options.highlightText &&
            `text-theme-highlight-text-${theme.toLowerCase()}`
    );
}
