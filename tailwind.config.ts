import type { Config } from "tailwindcss";
import { THEME } from "@/lib/theme";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: THEME.colors,
            fontFamily: THEME.fontFamily,
            backgroundImage: THEME.backgroundImage,
            transitionProperty: THEME.transitionProperty,
        },
    },
    plugins: [],
};

export default config;
