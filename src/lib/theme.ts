// Theme configuration - single source of truth for the entire application
// Used by both the React components and Tailwind config

export type ColorSet = {
    DARK: string;
    LIGHT: string;
};

export type ThemeColors = {
    BACKGROUND: ColorSet;
    TEXT: ColorSet;
    ACCENT: ColorSet;
    SCROLL: ColorSet;
    HIGHLIGHT_BG: ColorSet;
    HIGHLIGHT_TEXT: ColorSet;
};

export const COLORS: ThemeColors = {
    BACKGROUND: {
        DARK: "#17181C",
        LIGHT: "whitesmoke",
    },
    TEXT: {
        DARK: "whitesmoke",
        LIGHT: "blue",
    },
    ACCENT: {
        DARK: "crimson",
        LIGHT: "tomato",
    },
    SCROLL: {
        DARK: "#DEEFB7",
        LIGHT: "#DEEFB7", // Reusing dark theme scroll color for light theme
    },
    HIGHLIGHT_BG: {
        DARK: "darkblue",
        LIGHT: "blue",
    },
    HIGHLIGHT_TEXT: {
        DARK: "palegreen",
        LIGHT: "palegreen",
    },
};

export const FONTS = {
    HEADING: {
        FAMILY: "var(--font-major-mono)",
        FALLBACK: "Major Mono Display, monospace",
    },
    CODE: {
        FAMILY: "var(--font-fira-code)",
        FALLBACK: "Fira Code, monospace",
    },
    SERIF: {
        FAMILY: "var(--font-eb-garamond)",
        FALLBACK: "EB Garamond, serif",
    },
    ORBITRON: {
        FAMILY: "var(--font-orbitron)",
        FALLBACK: "Orbitron, sans-serif",
    },
    SYSTEM: {
        FAMILY: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
};

export const BACKGROUNDS = {
    DARK: {
        FONT: "url('https://i.gifer.com/ByRk.gif')",
        NOISE: 'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')',
    },
    LIGHT: {
        FONT: "url('https://media.giphy.com/media/YAxpwobytgjWgmIbP9/giphy.gif')",
        NOISE: 'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')',
    },
};

export const FILTERS = {
    DARK: {
        NOISE: "contrast(145%) brightness(650%) invert(100%)",
        NOISE_MOBILE: "contrast(125%) brightness(400%) invert(100%)",
        SVG: "invert(100%)",
    },
    LIGHT: {
        NOISE: "contrast(125%) brightness(400%) invert(0%)",
        NOISE_MOBILE: "contrast(100%) brightness(300%) invert(0%)",
        SVG: "none",
    },
};

export const ANIMATIONS = {
    DEFAULT_TRANSITION: "all 0.3s ease-in-out",
    SHORT_TRANSITION: "all 0.2s ease",
    LONG_TRANSITION: "all 0.5s ease-in-out",
    ROTATE_DURATION: 10, // seconds
};

export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
};

export const SPACING = {
    SECTION_MARGIN: "5rem",
    CONTAINER_PADDING: "2rem",
    HEADER_HEIGHT: "6rem",
};

// Export all theme variables in a format that can be used by Tailwind
export const THEME = {
    colors: {
        // Dark theme colors
        "background-dark": COLORS.BACKGROUND.DARK,
        "text-dark": COLORS.TEXT.DARK,
        "accent-dark": COLORS.ACCENT.DARK,
        "scroll-dark": COLORS.SCROLL.DARK,
        "highlight-bg-dark": COLORS.HIGHLIGHT_BG.DARK,
        "highlight-text-dark": COLORS.HIGHLIGHT_TEXT.DARK,

        // Light theme colors
        "background-light": COLORS.BACKGROUND.LIGHT,
        "text-light": COLORS.TEXT.LIGHT,
        "accent-light": COLORS.ACCENT.LIGHT,
        "scroll-light": COLORS.SCROLL.LIGHT,
        "highlight-bg-light": COLORS.HIGHLIGHT_BG.LIGHT,
        "highlight-text-light": COLORS.HIGHLIGHT_TEXT.LIGHT,
    },
    fontFamily: {
        heading: [FONTS.HEADING.FAMILY, ...FONTS.HEADING.FALLBACK.split(", ")],
        code: [FONTS.CODE.FAMILY, ...FONTS.CODE.FALLBACK.split(", ")],
        serif: [FONTS.SERIF.FAMILY, ...FONTS.SERIF.FALLBACK.split(", ")],
        orbitron: [
            FONTS.ORBITRON.FAMILY,
            ...FONTS.ORBITRON.FALLBACK.split(", "),
        ],
        system: FONTS.SYSTEM.FAMILY.split(", "),
    },
    backgroundImage: {
        "font-dark": BACKGROUNDS.DARK.FONT,
        "font-light": BACKGROUNDS.LIGHT.FONT,
        "noise-pattern": BACKGROUNDS.DARK.NOISE,
    },
    transitionProperty: {
        all: ANIMATIONS.DEFAULT_TRANSITION,
        short: ANIMATIONS.SHORT_TRANSITION,
        long: ANIMATIONS.LONG_TRANSITION,
    },
};
