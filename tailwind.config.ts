import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{ts,tsx,mdx}",
        "./src/components/**/*.{ts,tsx,mdx}",
        "./src/app/**/*.{ts,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                header: ["'Poppins'", "sans-serif"],
                mono: ["'Fira Code'", "monospace"],
                majorMono: ["'Major Mono Display'", "monospace"],
                garamond: ["'EB Garamond'", "serif"],
                orbitron: ["'Orbitron'", "sans-serif"],
            },
            colors: {
                background: {
                    DEFAULT: "#17181C",
                    light: "#F4F1EA",
                },
                textColor: {
                    DEFAULT: "#F4F1EA",
                    light: "#001ECB",
                },
                accent: {
                    DEFAULT: "#D7482F",
                    light: "#28B7D0",
                },
                scroll: "#DEEFB7",
                highlight: "darkblue",
                highlightLight: "#001AA8",
                highlightFont: "palegreen",
            },
            animation: {
                "spin-slow": "spin 10s linear infinite",
                "soft-bounce": "softBounce 3s ease-in-out infinite",
                "roles-change": "change 10s infinite",
            },
            keyframes: {
                softBounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                change: {
                    "0%, 12.66%, 100%": { transform: "translate3d(0, 0, 0)" },
                    "16.66%, 29.32%": { transform: "translate3d(0, -25%, 0)" },
                    "33.32%, 45.98%": { transform: "translate3d(0, -50%, 0)" },
                    "49.98%, 62.64%": { transform: "translate3d(0, -75%, 0)" },
                    "66.64%, 79.3%": { transform: "translate3d(0, -50%, 0)" },
                    "83.3%, 95.96%": { transform: "translate3d(0, -25%, 0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
