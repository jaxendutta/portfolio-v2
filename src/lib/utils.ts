// src/lib/utils.ts

/**
 * Calculate the brightness of a color (0-1)
 * @param color - Hex color with or without leading #
 */
export function getBrightness(color: string): number {
    // Remove any leading #
    color = color.replace("#", "");

    // Parse the color
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Format a date to display in a user-friendly way
 */
export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}

/**
 * Get the project ID from the URL
 */
export function getProjectIdFromUrl(): string {
    if (typeof window === "undefined") return "index";

    const path = window.location.pathname;
    const segments = path.split("/").filter((segment) => segment.length > 0);
    return segments[segments.length - 1] || "index";
}
