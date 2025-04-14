import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-major-mono)", "monospace"],
                display: ["var(--font-major-mono)", "monospace"],
                code: ["var(--font-fira-code)", "monospace"],
                serif: ["var(--font-eb-garamond)", "serif"],
                orbitron: ["var(--font-orbitron)", "sans-serif"],
                system: ["system-ui", "-apple-system", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
