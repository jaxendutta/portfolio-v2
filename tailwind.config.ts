// File: tailwind.config.ts
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
            colors: {
                background: {
                    dark: "#17181C",
                    light: "#F4F1EA",
                },
                text: {
                    dark: "#F4F1EA",
                    light: "#001ECB",
                },
                nav: {
                    dark: "#F4F1EA",
                    light: "#FFE134",
                },
                accent: {
                    dark: "#D7482F",
                    light: "#28B7D0",
                    constant: "#D7482F",
                },
                scroll: "#DEEFB7",
                grey: "lightgrey",
            },
            fontFamily: {
                heading: ["var(--font-major-mono)", "monospace"],
                code: ["var(--font-fira-code)", "monospace"],
                serif: ["var(--font-eb-garamond)", "serif"],
                orbitron: ["var(--font-orbitron)", "sans-serif"],
                xanh: ["var(--font-xanh-mono)", "monospace"],
            },
            animation: {
                "spin-slow": "spin 10s linear infinite",
                "soft-bounce": "soft-bounce 3s infinite ease-in-out",
                "role-change": "change 10s infinite",
                scroll: "scroll 5s linear infinite",
                "scroll-backward": "scroll-backward 5s linear infinite",
            },
            keyframes: {
                "soft-bounce": {
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
                scroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "scroll-backward": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
            backgroundImage: {
                "noise-dark":
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 700 700' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                "font-dark": "url('https://i.gifer.com/ByRk.gif')",
                "font-light":
                    "url('https://media.giphy.com/media/YAxpwobytgjWgmIbP9/giphy.gif')",
            },
        },
    },
    plugins: [],
};

export default config;
